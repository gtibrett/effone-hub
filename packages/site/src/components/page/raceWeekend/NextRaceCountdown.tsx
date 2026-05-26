import '@/polyfills';
import {Card, useTheme} from '@mui/material';
import {PaletteColor} from '@mui/material/styles';
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

	return (
		<Card
			className="py-4 px-4 [&,&_*]:!text-[var(--countdown-fg)]"
			style={{
				background,
				['--countdown-fg' as any]: `contrast-color(${background} vs white, black)`
			}}
		>
			<CountdownClock timeTo={nextEvent.timeTo} size="large"/>
		</Card>
	);
}