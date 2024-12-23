import {useAppState} from '@/components/app';
import {DriversFilters, DriversList, DriversListFilters} from '@/components/page/driver';
import {Page} from '@/components/ui';
import {setPageTitle} from '@gtibrett/mui-additions';
import {Card, CardContent, Skeleton} from '@mui/material';
import {Suspense, useState} from 'react';

export default function Drivers() {
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
				<Suspense fallback={<Skeleton variant="rectangular" height="65vh"/>}>
					<CardContent>
						<DriversList filters={filters}/>
					</CardContent>
				</Suspense>
			</Card>
		</Page>
	);
}
