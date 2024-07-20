import {useAppState} from '@/components/app';
import {DriversFilters, DriversList, DriversListFilters} from '@/components/page/driver';
import {Page} from '@/components/ui';
import {Driver} from '@/gql/graphql';
import {apolloClient} from '@/useApolloClient';
import {setPageTitle} from '@gtibrett/mui-additions';
import {Card, CardContent} from '@mui/material';
import {useState} from 'react';
import DriversQuery from '../../components/page/driver/DriversQuery';

export default function Drivers({drivers}: { drivers: Driver[] }) {
	setPageTitle('Drivers');
	
	const [{currentSeason}]     = useAppState();
	const [filters, setFilters] = useState<DriversListFilters>({
		season:      currentSeason,
		search:      '',
		nationality: ''
	});
	
	return (
		<Page title="Drivers">
			<Card>
				<DriversFilters filters={filters} setFilters={setFilters}/>
				<CardContent>
					<DriversList drivers={drivers} filters={filters}/>
				</CardContent>
			</Card>
		</Page>
	);
}

export async function getStaticProps() {
	const {data: {drivers}} = await apolloClient.query<{ drivers: Driver[] }>({query: DriversQuery});
	
	return {
		props: {
			drivers
		}
	};
}