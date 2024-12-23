import {useAppState} from '@/components/app';
import {CircuitsFilters, CircuitsList, CircuitsListFilters} from '@/components/page/circuits';
import {Page} from '@/components/ui';
import {Circuit} from '@/gql/graphql';
import {setPageTitle} from '@gtibrett/mui-additions';
import {Card, CardContent, Skeleton} from '@mui/material';
import {Suspense, useState} from 'react';

export default function Circuits({circuits}: { circuits: Circuit[] }) {
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
				<Suspense fallback={<Skeleton variant="rectangular" height="65vh"/>}>
					<CardContent>
						<CircuitsList filters={filters}/>
					</CardContent>
				</Suspense>
			</Card>
		</Page>
	);
}
