'use client';

import {useAppState} from '@/components/app';
import {CircuitsFilters, CircuitsList, CircuitsListFilters} from '@/components/page/circuits';
import {Page, Card, CardContent, Skeleton} from '@/components/ui';
  
import {Suspense, useState} from 'react';

export default function CircuitsContent() {
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
