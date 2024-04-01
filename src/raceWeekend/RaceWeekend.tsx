import {useEffTheme, WikipediaLink} from '@effonehub/ui-components';
import {alpha, Box, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, Hidden, Skeleton, ThemeProvider, Typography} from '@mui/material';
import CircuitMap from '../maps/CircuitMap';
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
		backgroundImage: `url(${process.env.PUBLIC_URL}/carbon-fiber-texture.png)`,
		position:        'relative',
		
		'&:before': {
			content:    '" "',
			position:   'absolute',
			left:       0,
			top:        0,
			height:     '100%',
			width:      '100%',
			zIndex:     1,
			background: alpha(lightTheme.palette.secondary.main, .5)
		},
		
		'& > *': {
			zIndex:   2,
			position: 'relative'
		}
	};
	
	const raceDate = new Date(`${race.date} ${race.time} UTC`);
	
	return (
		<Grid item xs={12} md={12}>
			<ThemeProvider theme={darkTheme}>
				<Card sx={sx}>
					<Hidden smDown>
						<CardMedia sx={{float: 'right', width: 200, p: 1, boxSizing: 'border-box'}}>
							<CircuitMap variant="simple" circuitRef={race.circuit.circuitRef}/>
						</CardMedia>
					</Hidden>
					<CardHeader
						title={race.name}
						titleTypographyProps={{fontSize:30}}
						subheader={
							<>
								{raceDate.toLocaleDateString(undefined, {month: 'long', day: 'numeric'})}
								,&nbsp;
								{raceDate.toLocaleTimeString(undefined, {hour: 'numeric', minute: '2-digit'})}
							</>
						}
						subheaderTypographyProps={{fontSize:18}}
					/>
					<CardContent>
						<Typography variant="body1" component="p">{race.summary.extract} <Box component="span" ml={1} sx={{'> a': {color: `#FFF !important`}}}><WikipediaLink href={race.url}/></Box></Typography>
					</CardContent>
					<CardActions sx={{p: 0, mx: 1, mb: 1}}>
						<NextRaceCountdown race={race}/>
					</CardActions>
				</Card>
			</ThemeProvider>
		</Grid>
	);
}