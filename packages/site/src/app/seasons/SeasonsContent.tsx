'use client';

import { Suspense } from 'react';
import { Card, Skeleton } from '@mui/material';

import { SeasonsList } from '@/components/page/season';
import { Page } from '@/components/ui';

export default function SeasonsContent() {
	return (
		<Page title="Past Seasons">
			<Suspense fallback={<Skeleton variant="rectangular" height="65vh" />}>
				<Card>
					<SeasonsList />
				</Card>
			</Suspense>
		</Page>
	);
}
