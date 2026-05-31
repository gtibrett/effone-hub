import '@/polyfills';
import { Card } from '@mui/material';
import { PaletteColor } from '@mui/material/styles';

import CountdownClock from './CountdownClock';
import { NextRace } from './useNextRaceData';
import useRaceScheduleEvents from './useRaceScheduleEvents';

type NextRaceCountdownProps = {
	race: NextRace;
	variant: keyof Pick<PaletteColor, 'dark' | 'main'>;
};

export default function NextRaceCountdown({ race, variant }: NextRaceCountdownProps) {
	const scheduleEvents = useRaceScheduleEvents(race);

	scheduleEvents.sortByAttribute('timeTo');
	scheduleEvents.reverse();

	const [nextEvent] = scheduleEvents;

	return (
		<Card className="py-4 px-4 bg-secondary-700 text-white">
			<CountdownClock timeTo={nextEvent.timeTo} size="large" />
		</Card>
	);
}
