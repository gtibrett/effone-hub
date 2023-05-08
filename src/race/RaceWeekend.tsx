import {Race} from '@gtibrett/effone-hub-api';
import {alpha, Card, CardContent, Grid, ThemeProvider, Typography} from '@mui/material';
import {useEffect, useState} from 'react';
import Caxios from '../api/Caxios';
import {getAPIUrl, mapSchedule} from '../api/Ergast';
import CircuitMap from '../maps/CircuitMap';
import NextRaceCountdown from '../schedule/NextRaceCountdown';
import {useEffTheme} from '../ui-components/Theme';

export default function RaceWeekend() {
	const darkTheme               = useEffTheme('dark');
	const lightTheme              = useEffTheme('light');
	const [nextRace, setNextRace] = useState<Race>();
	
	useEffect(() => {
		Caxios.get(getAPIUrl(`/current.json`))
		      .then(mapSchedule)
		      .then((races) => {
			      const now        = new Date();
			      const thursday   = new Date().setDate(now.getDate() - (now.getDay() || 7) + 4);
			      const nextMonday = new Date().setDate(now.getDate() - (now.getDay() || 7) + 8);
			      
			      const futureRaces = races.filter(r => {
				      const raceDate = new Date(`${r.date} ${r.time}`).getTime();
				      
				      return raceDate >= thursday && raceDate <= nextMonday;
			      });
			      
			      if (futureRaces.length) {
				      setNextRace(futureRaces.shift());
			      }
		      });
	}, []);
	
	if (!nextRace) {
		return null;
	}
	
	const sx = {
		background:      lightTheme.palette.secondary.main,
		backgroundImage: `url(${require('../ui-components/carbon-fiber-texture.png')})`,
		
		'& > .MuiCardContent-root': {
			background: alpha(lightTheme.palette.secondary.main, .5)
		}
	};
	
	const raceDate = new Date(`${nextRace.date} ${nextRace.time}`);
	
	return (
		<ThemeProvider theme={darkTheme}>
			<Card variant="outlined" sx={sx}>
				<CardContent>
					<Grid container spacing={1} justifyContent="space-between" alignItems="center">
						<Grid item>
							<ThemeProvider theme={darkTheme}>
								<Typography component="h2">Race Weekend</Typography>
								<Typography variant="h3" component="p" sx={{fontFamily: 'Formula1', fontWeight: 'bold'}}>{nextRace.raceName}</Typography>
								<Typography variant="h5" component="p">
									{raceDate.toLocaleDateString(undefined, {month: 'long', day: 'numeric'})}
									,&nbsp;
									{raceDate.toLocaleTimeString(undefined, {hour: 'numeric', minute: '2-digit'})}
								</Typography>
							</ThemeProvider>
						</Grid>
						<Grid item xs={3}><CircuitMap variant="simple" circuit={nextRace.Circuit} height={125}/></Grid>
						<Grid item sx={{width: 250, mt: -2.125, mb: -3.125, mr: -2.125}}><NextRaceCountdown race={nextRace}/></Grid>
					</Grid>
				</CardContent>
			</Card>
		</ThemeProvider>
	);
}