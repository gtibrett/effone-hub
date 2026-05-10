'use client';

import Season from '@/components/page/season/Season';

type SeasonData = {
	year: number;
};

export default function HomeContent({season}: {season: SeasonData}) {
	return <Season season={season}/>;
}
