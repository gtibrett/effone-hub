'use client';

import {Card} from '@/components/ui';
import {useCssTokens} from '@/lib/cssTokens';
import {darken, getContrastText} from '@/lib/color';
import '@/polyfills';

import CountdownClock from './CountdownClock';
import useRaceScheduleEvents from './useRaceScheduleEvents';
import {NextRace} from './useNextRaceData';

type NextRaceCountdownProps = {
	race: NextRace
	variant: 'dark' | 'main'
}

export default function NextRaceCountdown({race, variant}: NextRaceCountdownProps) {
	const tokens         = useCssTokens();
	const scheduleEvents = useRaceScheduleEvents(race);
	const background     = variant === 'dark' ? darken(tokens.secondary, 0.2) : tokens.secondary;

	scheduleEvents.sortByAttribute('timeTo');
	scheduleEvents.reverse();

	const [nextEvent] = scheduleEvents;
	const fg          = getContrastText(background);

	return (
		<Card
			className="py-4 px-4"
			style={{background, color: fg}}
		>
			<CountdownClock timeTo={nextEvent.timeTo} size="large"/>
		</Card>
	);
}
