import {useTheme, PaletteColor} from '@/lib/theme';
import {Card} from '@/components/ui';
import '@/polyfills';

import CountdownClock from './CountdownClock';
import useRaceScheduleEvents from './useRaceScheduleEvents';
import {NextRace} from './useNextRaceData';

type NextRaceCountdownProps = {
	race: NextRace
	variant: keyof Pick<PaletteColor, 'dark' | 'main'>
}

export default function NextRaceCountdown({race, variant}: NextRaceCountdownProps) {
	const theme          = useTheme();
	const scheduleEvents = useRaceScheduleEvents(race);
	const background     = theme.palette.secondary[variant];

	scheduleEvents.sortByAttribute('timeTo');
	scheduleEvents.reverse();

	const [nextEvent] = scheduleEvents;
	const fg = theme.palette.getContrastText(background);

	return (
		<Card
			className="py-4 px-4"
			style={{background, color: fg}}
		>
			<CountdownClock timeTo={nextEvent.timeTo} size="large"/>
		</Card>
	);
}