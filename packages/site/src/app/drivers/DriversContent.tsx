'use client';

import { useState } from 'react';
import { Card, CardContent } from '@mui/material';

import { useAppState } from '@/components/app';
import { DriversFilters, DriversList, type DriversListFilters } from '@/components/page/driver';
import { Page } from '@/components/ui';
import type { Driver } from '@/gql/graphql';

type DriversContentProps = {
	drivers: Driver[];
};

export default function DriversContent({ drivers }: DriversContentProps) {
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
				<CardContent>
					<DriversList drivers={drivers} filters={filters} />
				</CardContent>
			</Card>
		</Page>
	);
}
