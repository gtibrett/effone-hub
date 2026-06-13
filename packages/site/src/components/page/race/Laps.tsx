import { Alert } from '@mui/material';

import LapByLap from './lapByLap/LapByLap';
import type { LapByLapData } from './lapByLap/useLapByLapChartData';
import LapTimesTable from './lapTimes/LapTimesTable';

type LapsProps = {
	lapByLapData: LapByLapData;
};

export default function Laps({ lapByLapData }: LapsProps) {
	if (!lapByLapData.data?.length) {
		return (
			<Alert variant="outlined" severity="info">
				Lap Data Not Available
			</Alert>
		);
	}

	return (
		<>
			<LapByLap lapByLapData={lapByLapData} />
			<LapTimesTable lapByLapData={lapByLapData} />
		</>
	);
}
