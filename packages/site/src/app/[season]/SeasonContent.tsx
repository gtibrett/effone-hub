'use client';

import SeasonView from '@/components/page/season/Season';

export default function SeasonContent({season}: {season: {year: number}}) {
	return <SeasonView season={season}/>;
}
