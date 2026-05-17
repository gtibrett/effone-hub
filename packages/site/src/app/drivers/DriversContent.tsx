'use client';

import {useAppState} from '@/components/app';
import {DriversFilters, DriversList, DriversListFilters} from '@/components/page/driver';
import {Page, Card, CardContent, Skeleton} from '@/components/ui';
  
import {Suspense, useState} from 'react';

export default function DriversContent() {
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
				<Suspense fallback={<Skeleton variant="rectangular" className="h-[65vh]"/>}>
					<CardContent>
						<DriversList filters={filters}/>
					</CardContent>
				</Suspense>
			</Card>
		</Page>
	);
}
