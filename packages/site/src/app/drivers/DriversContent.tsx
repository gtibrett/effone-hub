'use client';

import { Suspense, useState } from 'react';
import { Card, CardContent, Skeleton } from '@mui/material';

import { useAppState } from '@/components/app';
import { DriversFilters, DriversList, DriversListFilters } from '@/components/page/driver';
import { Page } from '@/components/ui';

export default function DriversContent() {
	const [{ currentSeason }] = useAppState();
	const [filters, setFilters] = useState<DriversListFilters>({
		season: currentSeason,
		search: '',
		nationality: ''
	});

	return (
		<Page title="Drivers">
			<Card>
				<DriversFilters filters={filters} setFilters={setFilters} />
				<Suspense fallback={<Skeleton variant="rectangular" height="65vh" />}>
					<CardContent>
						<DriversList filters={filters} />
					</CardContent>
				</Suspense>
			</Card>
		</Page>
	);
}
