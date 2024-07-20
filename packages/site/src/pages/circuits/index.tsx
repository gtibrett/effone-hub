import {useAppState} from '@/components/app';
import {CircuitsFilters, CircuitsList, CircuitsListFilters} from '@/components/page/circuits';
import CircuitQuery from '@/components/page/circuits/CircuitsQuery';
import {ConstructorsQuery} from '@/components/page/constructor';
import {TeamWithSeasons} from '@/components/page/constructor/useConstructorsList';
import {Page} from '@/components/ui';
import {SuspendedTable} from '@/components/ui/suspense';
import {Circuit} from '@/gql/graphql';
import {apolloClient} from '@/useApolloClient';
import {setPageTitle} from '@gtibrett/mui-additions';
import {Card, CardContent, Grid, Skeleton} from '@mui/material';
import {Suspense, useState} from 'react';

const RowSkeleton = () => (
	<Grid container spacing={2}>
		<Grid item sx={{flexGrow:1}}><Skeleton variant="rectangular" height="1.5em"/></Grid>
		<Grid item sx={{flexGrow:.75}}><Skeleton variant="rectangular" height="1.5em"/></Grid>
		<Grid item sx={{flexGrow:.25}}><Skeleton variant="rectangular" height="1.5em"/></Grid>
	</Grid>
);

export default function Circuits({circuits}: {circuits: Circuit[]}) {
	setPageTitle('Circuits');
	
	const [{currentSeason}]     = useAppState();
	const [filters, setFilters] = useState<CircuitsListFilters>({
		season: currentSeason,
		search: ''
	});
	
	return (
		<Page title="Circuits">
			<Card>
				<CircuitsFilters filters={filters} setFilters={setFilters}/>
				<CardContent>
					<Suspense fallback={<SuspendedTable rows={20} cols={3} rowSkeleton={<RowSkeleton/>}/>}>
						<CircuitsList circuits={circuits} filters={filters}/>
					</Suspense>
				</CardContent>
			</Card>
		</Page>
	);
}

export async function getStaticProps() {
	const {data: {circuits}} = await apolloClient.query<{ circuits: Circuit[] }>({query: CircuitQuery});
	
	return {
		props: {
			circuits
		}
	};
}