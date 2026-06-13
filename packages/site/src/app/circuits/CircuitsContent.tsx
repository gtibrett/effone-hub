'use client';

import { Suspense, useState } from 'react';
import { Card, CardContent, Skeleton } from '@mui/material';

import { useAppState } from '@/components/app';
import {
	CircuitsFilters,
	CircuitsList,
	type CircuitsListFilters
} from '@/components/page/circuits';
import { Page } from '@/components/ui';

export default function CircuitsContent() {
	const [{ currentSeason }] = useAppState();
	const [filters, setFilters] = useState<CircuitsListFilters>({
		season: currentSeason,
		search: ''
	});

	return (
		<Page title="Circuits">
			<Card>
				<CircuitsFilters filters={filters} setFilters={setFilters} />
				<Suspense fallback={<Skeleton variant="rectangular" height="65vh" />}>
					<CardContent>
						<CircuitsList filters={filters} />
					</CardContent>
				</Suspense>
			</Card>
		</Page>
	);
}
