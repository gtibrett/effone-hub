import {alpha, Card, CardContent, Grid, ThemeProvider, Typography, useTheme} from '@mui/material';
import {useEffect, useState} from 'react';
import Caxios from '../api/Caxios';
import {getAPIUrl, mapSchedule} from '../api/Ergast';
import CircuitMap from '../maps/CircuitMap';
import NextRaceCountdown from '../schedule/NextRaceCountdown';
import {useEffTheme} from '../ui-components/Theme';
import {RaceWithTimes} from './types';

export default function RaceWeekend() {
	const theme                   = useTheme();
	const darkTheme               = useEffTheme('dark');
	const [nextRace, setNextRace] = useState<RaceWithTimes>();
	
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
		background:      theme.palette.secondary.main,
		backgroundImage: `url(${require('../ui-components/carbon-fiber-texture.png')})`,
		
		'& *': {
			color: `${theme.palette.secondary.contrastText} !important`
		},
		
		'& > .MuiCardContent-root': {
			background: alpha(theme.palette.secondary.main, .5)
		}
	};
	
	return (
		<Card variant="outlined" sx={sx}>
			<CardContent>
				<ThemeProvider theme={darkTheme}>
					<Grid container spacing={1} justifyContent="space-between" alignItems="center">
						<Grid item>
							<Typography>Race Weekend</Typography>
							<Typography variant="h3" sx={{fontFamily: 'Racing Sans One'}}>{nextRace.raceName}</Typography>
						</Grid>
						<Grid item xs={3}><CircuitMap variant="simple" circuit={nextRace.Circuit} height={125}/></Grid>
						<Grid item sx={{width: 250, mt: -2.125, mb: -3.125, mr: -2.125}}><NextRaceCountdown race={nextRace}/></Grid>
					</Grid>
				</ThemeProvider>
			</CardContent>
		</Card>
	);
}