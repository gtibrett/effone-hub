'use client';

import { useState } from 'react';
import { Card, CardContent } from '@mui/material';

import { useAppState } from '@/components/app';
import {
	ConstructorsFilters,
	ConstructorsList,
	type ConstructorsListFilters
} from '@/components/page/constructor';
import type { TeamWithSeasons } from '@/components/page/constructor/useConstructorsList';
import { Page } from '@/components/ui';

type Props = {
	teams: TeamWithSeasons[];
};

export default function ConstructorsContent({ teams }: Props) {
	const [{ currentSeason }] = useAppState();
	const [filters, setFilters] = useState<ConstructorsListFilters>({
		season: currentSeason,
		search: ''
	});

	return (
		<Page title="Constructors">
			<Card>
				<ConstructorsFilters filters={filters} setFilters={setFilters} />
				<CardContent>
					<ConstructorsList teams={teams} filters={filters} />
				</CardContent>
			</Card>
		</Page>
	);
}
