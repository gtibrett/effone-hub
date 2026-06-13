'use client';

import { useState } from 'react';
import { Card, CardContent } from '@mui/material';

import { useAppState } from '@/components/app';
import {
	CircuitsFilters,
	CircuitsList,
	type CircuitsListFilters
} from '@/components/page/circuits';
import { Page } from '@/components/ui';
import type { Circuit } from '@/gql/graphql';

type CircuitsContentProps = {
	circuits: Circuit[];
};

export default function CircuitsContent({ circuits }: CircuitsContentProps) {
	const [{ currentSeason }] = useAppState();
	const [filters, setFilters] = useState<CircuitsListFilters>({
		season: currentSeason,
		search: ''
	});

	return (
		<Page title="Circuits">
			<Card>
				<CircuitsFilters filters={filters} setFilters={setFilters} />
				<CardContent>
					<CircuitsList circuits={circuits} filters={filters} />
				</CardContent>
			</Card>
		</Page>
	);
}
