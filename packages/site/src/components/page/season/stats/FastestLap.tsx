import { Typography } from '@mui/material';

import { type DataWithValue, StatCard } from '@/components/app';
import type { FastestLap as FastestLapNode, Race } from '@/gql/graphql';
import { getTimeStringFromDate } from '@/helpers';

import type { FastestLapQueryData } from './queries';
import type { SeasonStatProps } from './types';

interface FastestSeasonLap extends DataWithValue {
	quali: boolean;
	name: Race['officialName'];
	round: Race['round'];
	lap: FastestLapNode['lap'];
	driverId: FastestLapNode['driverId'];
}

type FastestLapProps = SeasonStatProps & { data: FastestLapQueryData };

export default function FastestLap({ size = 'small', data }: FastestLapProps) {
	const races = data?.season?.racesByYear ?? [];

	if (!races.length) {
		return null;
	}

	let fastestSeasonLap: FastestSeasonLap | null = null;

	races.forEach(({ officialName, round, fastestLaps }) => {
		const node = fastestLaps?.[0];
		if (!node || node.timeMillis == null || node.driverId == null) {
			return;
		}

		if (fastestSeasonLap === null || node.timeMillis < fastestSeasonLap.value) {
			fastestSeasonLap = {
				name: officialName,
				round,
				lap: node.lap,
				value: node.timeMillis,
				driverId: node.driverId,
				quali: false
			};
		}
	});

	if (!fastestSeasonLap) {
		return null;
	}

	const winner: FastestSeasonLap = fastestSeasonLap;
	const fastestDriver = new Map<string, FastestSeasonLap>();
	fastestDriver.set(winner.driverId || '', winner);

	const formatExtra = (d: FastestSeasonLap) => (
		<Typography variant="caption">
			{d.name}: {d.quali ? 'Q' : 'Lap '}
			{d.lap}
		</Typography>
	);

	return (
		<StatCard<FastestSeasonLap, FastestSeasonLap>
			label="Fastest Lap"
			size={size}
			loading={false}
			data={fastestDriver}
			format={t => getTimeStringFromDate(new Date(t.value))}
			extra={formatExtra}
		/>
	);
}
