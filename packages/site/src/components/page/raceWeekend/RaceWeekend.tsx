import {
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Grid,
	ThemeProvider,
	Typography
} from '@mui/material';

import { CarbonFiberOverlay, useEffTheme } from '@/components/ui';
import { getDateWithTime } from '@/helpers';

import NextRaceCountdown from './NextRaceCountdown';
import NextRaceSchedule from './NextRaceSchedule';
import useNextRaceData from './useNextRaceData';

type RaceWeekendProps = { season: number };

export default function RaceWeekend({ season }: RaceWeekendProps) {
	const { data } = useNextRaceData(season);
	const race = data?.race;
	const darkTheme = useEffTheme('dark');
	const lightTheme = useEffTheme('light');

	if (!race) {
		return null;
	} else {
		const raceDate = new Date(`${race.date}T${race.time}`);

		return (
			<Grid
				size={{
					xs: 12,
					md: 12
				}}
			>
				<ThemeProvider theme={darkTheme}>
					<Card id="next-race-weekend" className="relative bg-secondary-dark">
						<CarbonFiberOverlay />
						<CardHeader
							title={race.name}
							subheader={getDateWithTime(raceDate)}
							action={
								<ThemeProvider theme={lightTheme}>
									<NextRaceCountdown variant="dark" race={race} />
								</ThemeProvider>
							}
							slotProps={{
								title: { fontSize: 30 },
								subheader: { fontSize: 18 }
							}}
						/>
						<CardContent>
							<Typography variant="body1" component="p">
								{race.name}
							</Typography>
						</CardContent>
						<CardActions className="p-0 mx-2 mb-2">
							<NextRaceSchedule race={race} />
						</CardActions>
					</Card>
				</ThemeProvider>
			</Grid>
		);
	}
}
