import {useAppState} from '@effonehub/app';
import {Page} from '@effonehub/ui-components';
import {setPageTitle} from '@gtibrett/mui-additions';
import {Card, CardContent} from '@mui/material';
import {useState} from 'react';
import DriversFilters from './DriversFilters';
import DriversList from './DriversList';
import {DriversListFilters} from './types';
import useDriversList from './useDriversList';

export default function Drivers() {
	setPageTitle('Drivers');
	
	const [{currentSeason}]     = useAppState();
	const [filters, setFilters] = useState<DriversListFilters>({
		season:      currentSeason,
		search:      '',
		nationality: ''
	});
	const {data, loading}       = useDriversList(filters);
	
	return (
		<Page title="Drivers">
			<Card>
				<DriversFilters filters={filters} setFilters={setFilters}/>
				<CardContent>
					<DriversList loading={loading} drivers={data}/>
				</CardContent>
			</Card>
		</Page>
	);
}