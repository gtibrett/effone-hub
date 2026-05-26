import {
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Grid,
	ThemeProvider,
	Typography
} from '@mui/material';

import { CarbonFiberOverlay, useDarkTheme } from '@/components/ui';
import { getDateWithTime } from '@/helpers';

import NextRaceCountdown from './NextRaceCountdown';
import NextRaceSchedule from './NextRaceSchedule';
import useNextRaceData from './useNextRaceData';

type RaceWeekendProps = { season: number };

export default function RaceWeekend({ season }: RaceWeekendProps) {
	const darkTheme = useDarkTheme();
	const { data } = useNextRaceData(season);
	const race = data?.race;

	if (!race) {
		return null;
	} else {
		const raceDate = new Date(`${race.date}T${race.time}`);

		return (
			<ThemeProvider theme={darkTheme}>
				<Grid
					size={{
						xs: 12,
						md: 12
					}}
				>
					<Card id="next-race-weekend" className="relative bg-secondary-dark text-white">
						<CarbonFiberOverlay />
						<CardHeader
							title={race.name}
							subheader={getDateWithTime(raceDate)}
							action={<NextRaceCountdown variant="dark" race={race} />}
							slotProps={{
								title: { fontSize: 30 },
								subheader: { fontSize: 18, color: 'var(--color-white)' }
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
				</Grid>
			</ThemeProvider>
		);
	}
}
