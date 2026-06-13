import '@/polyfills';
import { Card } from '@mui/material';
import type { PaletteColor } from '@mui/material/styles';

import CountdownClock from './CountdownClock';
import type { NextRace } from './useNextRaceData';
import useRaceScheduleEvents from './useRaceScheduleEvents';

type NextRaceCountdownProps = {
	race: NextRace;
	variant: keyof Pick<PaletteColor, 'dark' | 'main'>;
};

// `variant` is part of the props contract (callers pass main/dark) but the card
// color is currently hardcoded; not consumed here. Kept in the type for callers.
export default function NextRaceCountdown({ race }: NextRaceCountdownProps) {
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
