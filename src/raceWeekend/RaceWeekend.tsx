import {alpha, Box, Card, CardContent, Grid, Hidden, Skeleton, ThemeProvider, Typography} from '@mui/material';
import CircuitMap from '../maps/CircuitMap';
import {useEffTheme, WikipediaLink} from '../ui-components';
import NextRaceCountdown from './NextRaceCountdown';
import useNextRaceData from './useNextRaceData';

type RaceWeekendProps = { season: number };

export default function RaceWeekend({season}: RaceWeekendProps) {
	const {data, loading} = useNextRaceData(season);
	const race            = data?.season.nextRace?.race;
	const darkTheme       = useEffTheme('dark');
	const lightTheme      = useEffTheme('light');
	
	if (loading) {
		return <Grid item xs={12}><Skeleton variant="rectangular" height={180}/></Grid>;
	}
	
	if (!race) {
		return null;
	}
	
	const sx = {
		background:      lightTheme.palette.secondary.main,
		backgroundImage: `url(${require('../ui-components/carbon-fiber-texture.png')})`,
		
		'& > .MuiCardContent-root': {
			background: alpha(lightTheme.palette.secondary.main, .5)
		}
	};
	
	const raceDate = new Date(`${race.date} ${race.time} UTC`);
	
	return (
		<>
			<Grid item xs={12} md={12}>
				<ThemeProvider theme={darkTheme}>
					<Card variant="outlined" sx={sx}>
						<CardContent>
							<Grid container spacing={1} justifyContent="space-between" alignItems="center">
								<Grid item xs={12} sm>
									<ThemeProvider theme={darkTheme}>
										<Typography component="h2" sx={{fontSize: 30, fontFamily: 'Racing Sans One', fontWeight: 'bold'}}>{race.name}</Typography>
										<Typography variant="h4" component="p">
											{raceDate.toLocaleDateString(undefined, {month: 'long', day: 'numeric'})}
											,&nbsp;
											{raceDate.toLocaleTimeString(undefined, {hour: 'numeric', minute: '2-digit'})}
										</Typography>
										<Typography variant="body1" component="p">{race.summary.extract} <Box component="span" ml={1} sx={{'> a': {color: `#FFF !important`}}}><WikipediaLink href={race.url}/></Box></Typography>
									</ThemeProvider>
								</Grid>
								<Hidden smDown><Grid item sm={3}><CircuitMap variant="simple" circuitRef={race.circuit.circuitRef} height={125}/></Grid></Hidden>
								<Grid item xs={12} sx={{maxWidth: {md: 250}, mt: {xs: 0, md: -2.125}, mb: {xs: 0, md: -3.125}, mr: {xs: 0, md: -2.125}}}><NextRaceCountdown race={race}/></Grid>
							</Grid>
						</CardContent>
					</Card>
				</ThemeProvider>
			</Grid>
		</>
	);
}