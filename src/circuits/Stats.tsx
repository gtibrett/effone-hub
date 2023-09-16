import {Grid} from '@mui/material';
import {Result} from '@gtibrett/effone-hub-graph-api';

export default function Stats({results}: { results: Result[] }) {
	if (!results?.length) {
		return null;
	}
	
	const [p1, p2, p3] = results;
	
	return (
		<Grid container spacing={2}>
			{p1.driver && <Grid item>
			</Grid>}
			
			{p2.driver && <Grid item>
			</Grid>}
			
			{p3.driver && <Grid item>
			</Grid>}
		</Grid>
	);
};