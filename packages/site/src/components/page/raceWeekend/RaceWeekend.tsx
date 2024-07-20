import {useEffTheme, WikipediaLink} from '@/components/ui';
import {getDateWithTime} from '@/helpers';
import {alpha, Box, Card, CardActions, CardContent, CardHeader, Grid, ThemeProvider, Typography} from '@mui/material';
import NextRaceCountdown from './NextRaceCountdown';
import NextRaceSchedule from './NextRaceSchedule';
import useNextRaceData from './useNextRaceData';

type RaceWeekendProps = { season: number };

export default function RaceWeekend({season}: RaceWeekendProps) {
	const {data}     = useNextRaceData(season);
	const race       = data?.season.nextRace?.race;
	const darkTheme  = useEffTheme('dark');
	const lightTheme = useEffTheme('light');
	
	if (!race) {
		return null;
	} else {
		const sx       = {
			background:      lightTheme.palette.secondary.main,
			backgroundImage: `url(/carbon-fiber-texture.png)`,
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
		const raceDate = new Date(`${race.date}T${race.time}`);
		
		return (
			<Grid item xs={12} md={12}>
				<ThemeProvider theme={darkTheme}>
					<Card sx={sx} id="next-race-weekend">
						<CardHeader
							title={race.name}
							titleTypographyProps={{fontSize: 30}}
							subheader={getDateWithTime(raceDate)}
							subheaderTypographyProps={{fontSize: 18}}
							action={<ThemeProvider theme={lightTheme}><NextRaceCountdown variant="dark" race={race}/></ThemeProvider>}
						/>
						<CardContent>
							<Typography variant="body1" component="p">{race.summary?.extract} <Box component="span" ml={1} sx={{'> a': {color: `#FFF !important`}}}><WikipediaLink href={race.url}/></Box></Typography>
						</CardContent>
						<CardActions sx={{p: 0, mx: 1, mb: 1}}>
							<NextRaceSchedule race={race}/>
						</CardActions>
					</Card>
				</ThemeProvider>
			</Grid>
		);
	}
};