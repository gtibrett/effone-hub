import '@/polyfills';
import {Card, SxProps, useTheme} from '@mui/material';
import {PaletteColor} from '@mui/material/styles';
import {getContrastText, getCssContrast, SUPPORTS_CONTRAST_COLOR} from '@/lib/useContrastText';
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

	// Nested `'& *'` cascade — emit both fallback + @supports CSS-only
	// override inside the same selector.
	const sx: SxProps = {
		py:       2, px: 2,
		background,
		'&, & *': {
			color:                          `${getContrastText(background)} !important`,
			[SUPPORTS_CONTRAST_COLOR]:      {color: `${getCssContrast(background)} !important`}
		}
	};
	
	return (
		<Card sx={sx}>
			<CountdownClock timeTo={nextEvent.timeTo} size="large"/>
		</Card>
	);
}