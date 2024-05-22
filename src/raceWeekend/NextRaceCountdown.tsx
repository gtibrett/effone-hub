import {Race} from '@gtibrett/effone-hub-graph-api';
import {Card, SxProps, useTheme} from '@mui/material';
import {PaletteColor} from '@mui/material/styles/createPalette';
import CountdownClock from './CountdownClock';
import useRaceScheduleEvents from './useRaceScheduleEvents';

type NextRaceCountdownProps = {
	race: Race
	variant: keyof Pick<PaletteColor, 'dark' | 'main'>
}

export default function NextRaceCountdown({race, variant}: NextRaceCountdownProps) {
	const theme          = useTheme();
	const scheduleEvents = useRaceScheduleEvents(race);
	const background     = theme.palette.secondary[variant];
	
	scheduleEvents.sortByAttribute('timeTo');
	scheduleEvents.reverse();
	
	const [nextEvent] = scheduleEvents;
	
	const sx: SxProps = {
		py:       2, px: 2,
		background,
		'&, & *': {
			color: `${theme.palette.getContrastText(background)} !important`
		}
	};
	
	return (
		<Card sx={sx}>
			<CountdownClock timeTo={nextEvent.timeTo} size="large"/>
		</Card>
	);
}