import {useInvertedTheme} from '@effonehub/ui-components';
import {Race} from '@gtibrett/effone-hub-graph-api';
import {Card} from '@mui/material';
import CountdownClock from './CountdownClock';
import useRaceScheduleEvents from './useRaceScheduleEvents';


export default function NextRaceCountdown({race}: { race: Race }) {
	const theme          = useInvertedTheme();
	const scheduleEvents = useRaceScheduleEvents(race);
	
	scheduleEvents.sortByAttribute('timeTo');
	scheduleEvents.reverse();
	
	const [nextEvent] = scheduleEvents;
	
	return (
		<Card sx={{background: theme.palette.secondary.dark, py: 2, px:2}}>
			<CountdownClock timeTo={nextEvent.timeTo} size="large"/>
		</Card>
	);
}