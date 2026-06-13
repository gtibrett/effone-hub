import { useMemo } from 'react';

import { useFallbackColor } from '@/components/ui';
import type { AppLapTime, Maybe } from '@/gql/graphql';
import type { DriverId } from '@/types';

import type { LapChartSeries } from './LapByLap';

export { lapsQuery } from './queries';

// Pick keeps this assignable to Partial<AppLapTime>, which the lapTimes/ consumers require.
export type LapTimeRow = Pick<
	AppLapTime,
	'lap' | 'position' | 'driverId' | 'timeText' | 'milliseconds'
>;

export type LapResultRow = {
	positionDisplayOrder?: number | null;
	positionNumber?: number | null;
	driverId?: string | null;
	driver: { id: string; lastName: string | null } | null;
	team: { colors: { primaryHex: Maybe<string> } | null } | null;
};

/** Shape of data accepted by useLapByLapData — matches RaceLapByLapData['race']. */
export type LapRacePayload = {
	lapTimes: LapTimeRow[];
	raceResults: LapResultRow[];
} | null;

export type LapByLapData = {
	loading: boolean;
	totalLaps?: number;
	data?: {
		driverId: DriverId;
		name: Maybe<string> | undefined;
		color: string;
		position: Maybe<number> | undefined;
		laps: LapTimeRow[];
	}[];
};

/** Derive LapByLapData from a pre-fetched server payload (no Apollo query). */
export const useLapByLapData = (payload: LapRacePayload): LapByLapData => {
	const fallbackColor = useFallbackColor();

	return useMemo<LapByLapData>(() => {
		const lapTimes = payload?.lapTimes ?? [];
		const results = payload?.raceResults ?? [];

		if (!lapTimes.length || !results.length) {
			return { loading: false, data: undefined, totalLaps: undefined };
		}

		return {
			loading: false,
			data: results.map(r => ({
				driverId: r.driverId ?? undefined,
				name: r.driver?.lastName,
				color: r.team?.colors?.primaryHex || fallbackColor,
				position: r.positionNumber ?? r.positionDisplayOrder,
				laps: lapTimes.filter(lt => lt.driverId === r.driverId)
			})),
			totalLaps: Math.max(...lapTimes.map(lt => lt.lap ?? 0))
		};
	}, [payload, fallbackColor]);
};

const useLapByLapChartData = (lapByLapData: LapByLapData) => {
	const { data = [], totalLaps = 0 } = lapByLapData;

	return useMemo<LapChartSeries[]>(() => {
		const drivers: LapChartSeries[] = [];

		data.forEach(({ driverId, laps, color, ...driverData }) => {
			driverId &&
				drivers.push({
					...driverData,
					driverId,
					id: driverId,
					color,
					data: laps.map(lt => ({
						x: lt.lap ?? 0,
						y: lt.position || null
					}))
				});
		});

		drivers.forEach(driver => {
			// Fill missing laps with last classified position (handles post-DSQ gaps).
			const lastPosition = driver.data.at(-1)?.y || null;
			for (let x = driver.data.length; x < totalLaps; x++) {
				driver.data.push({ x, y: lastPosition });
			}

			driver.data.push({ x: totalLaps + 1, y: lastPosition || null });
		});

		return drivers;
	}, [data, totalLaps]);
};

export default useLapByLapChartData;
