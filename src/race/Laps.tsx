import {Alert, Skeleton} from '@mui/material';
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
		return <Skeleton variant="rectangular" height={400}/>;
	}
	
	if (!data?.length) {
		return <Alert variant="outlined" severity="info">Lap Data Not Available</Alert>;
	}
	
	return (
		<>
			<LapByLap season={season} round={round}/>
			<LapTimesTable season={season} round={round}/>
		</>
	);
}