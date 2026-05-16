'use client';

import {SeasonsList} from '@/components/page/season';
import {Page} from '@/components/ui';
import {Card, Skeleton} from '@mui/material';
import {Suspense} from 'react';

export default function SeasonsContent() {
	return (
		<Page title="Past Seasons">
			<Suspense fallback={<Skeleton variant="rectangular" height="65vh"/>}>
				<Card>
					<SeasonsList/>
				</Card>
			</Suspense>
		</Page>
	);
}
