import {Grid} from '@mui/material';
import FastestLap from './stats/FastestLap';
import LapLeader from './stats/LapLeader';
import MostWins from './stats/MostWins';
import {CircuitDataProps} from './useCircuitByRef';

export default function Stats({data, loading}: CircuitDataProps) {
	if (!data || loading) {
		return null;
	}
	
	return (
		<Grid container spacing={2} sx={{py: 0}} justifyContent="stretch">
			<Grid item><LapLeader data={data} loading={loading}/></Grid>
			<Grid item><MostWins data={data} loading={loading}/></Grid>
			<Grid item><FastestLap data={data} loading={loading}/></Grid>
		</Grid>
	);
};