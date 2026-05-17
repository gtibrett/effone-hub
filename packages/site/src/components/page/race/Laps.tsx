import {Skeleton} from '@/components/ui';
import {Alert, AlertDescription} from '@/components/ui/shadcn/alert';

import LapByLap from './lapByLap/LapByLap';
import {useLapByLapData} from './lapByLap/useLapByLapChartData';
import LapTimesTable from './lapTimes/LapTimesTable';

type LapByLapProps = {
	season: number;
	round: number;
}

export default function Laps({season, round}: LapByLapProps) {
	const {loading, data} = useLapByLapData(season, round);
	
	if (loading) {
		return <Skeleton variant="rectangular" className="h-[400px]"/>;
	}
	
	if (!data?.length) {
		return <Alert><AlertDescription>Lap Data Not Available</AlertDescription></Alert>;
	}
	
	return (
		<>
			<LapByLap season={season} round={round}/>
			<LapTimesTable season={season} round={round}/>
		</>
	);
}