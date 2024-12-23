import {SeasonsList} from '@/components/page/season';
import {Page} from '@/components/ui';
import {setPageTitle} from '@gtibrett/mui-additions';
import {Card, Skeleton} from '@mui/material';
import {Suspense} from 'react';

export default function Seasons() {
	setPageTitle('Past Seasons');
	
	return (
		<Page title="Past Seasons">
			<Suspense fallback={<Skeleton variant="rectangular" height="65vh"/>}>
				<Card>
					<SeasonsList />
				</Card>
			</Suspense>
		</Page>
	);
}