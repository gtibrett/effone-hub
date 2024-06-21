import {useAppState} from '@/components/app';
import {DriversFilters, DriversList, DriversListFilters, useDriversList} from '@/components/page/driver';
import {Page} from '@/components/ui';
import {setPageTitle} from '@gtibrett/mui-additions';
import {Card, CardContent} from '@mui/material';
import {useState} from 'react';

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