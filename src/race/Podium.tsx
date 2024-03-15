import {Result} from '@gtibrett/effone-hub-graph-api';
import {Grid} from '@mui/material';
import {Fragment} from 'react';
import Place from './Place';

export default function Podium({results}: {
	results: Result[]
}) {
	if (!results?.length) {
		return null;
	}
	
	const [p1, p2, p3] = results;
	
	return (
		<>
			{
				[p1, p2, p3].map((p, i) => (
						<Grid item key={p.driver.driverId}>
							<Place driverId={p.driver.driverId} place={i + 1} sx={{height: '100%'}}/>
						</Grid>
					)
				)
			}
		</>
	);
};