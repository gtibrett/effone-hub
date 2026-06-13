'use client';

import { Card } from '@mui/material';

import { SeasonsList } from '@/components/page/season';
import type { SeasonData } from '@/components/page/season/types';
import { Page } from '@/components/ui';

type Props = {
	seasons: SeasonData[];
};

export default function SeasonsContent({ seasons }: Props) {
	return (
		<Page title="Past Seasons">
			<Card>
				<SeasonsList seasons={seasons} />
			</Card>
		</Page>
	);
}
