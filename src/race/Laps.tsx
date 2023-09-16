import {Tabs} from '@gtibrett/mui-additions';
import {Alert, Skeleton} from '@mui/material';
import LapByLap from './lapByLap/LapByLap';
import LapByLapTable from './lapByLap/LapByLapTable';
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
		<Tabs active="byLap" tabs={[
			{
				id:      'byLap',
				label:   'Lap by Lap',
				content: <>
					         <LapByLap season={season} round={round}/>
					         <LapByLapTable season={season} round={round}/>
				         </>
			},
			{
				id:      'times',
				label:   'Lap Times',
				content: <>
					         {/* FIXME: This doesn't work in a production build*/}
					         {/*<LapTimes laps={laps} results={results}/>*/}
					         <LapTimesTable season={season} round={round}/>
				         </>
			}
		]}/>
	);
}