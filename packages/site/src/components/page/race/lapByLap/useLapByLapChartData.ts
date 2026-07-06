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
			if (!driver.data.length) {
				return;
			}
			// Pad trailing laps with final classification, not last recorded lap position —
			// lapped/retired drivers stop recording laps early and their last on-track
			// position diverges from the official result (ties/gaps in the final column).
			const finalPosition = driver.position ?? driver.data.at(-1)?.y ?? null;
			const lastLap = Number(driver.data.at(-1)?.x ?? 0);
			for (let lap = lastLap + 1; lap <= totalLaps; lap++) {
				driver.data.push({ x: lap, y: finalPosition });
			}
		});

		return drivers;
	}, [data, totalLaps]);
};

export default useLapByLapChartData;
