import {Grid} from '@mui/material';
import {Result} from '@gtibrett/effone-hub-graph-api';
import Place from './Place';

export default function Podium({results}: { results: Result[] }) {
	if (!results?.length) {
		return null;
	}
	
	const [p1, p2, p3] = results;
	
	return (
		<Grid container spacing={2}>
			{p1.driver && <Grid item>
				<Place driverId={p1.driver.driverId} place={1}/>
			</Grid>}
			
			{p2.driver && <Grid item>
				<Place driverId={p2.driver.driverId} place={2}/>
			</Grid>}
			
			{p3.driver && <Grid item>
				<Place driverId={p3.driver.driverId} place={3}/>
			</Grid>}
		</Grid>
	);
};