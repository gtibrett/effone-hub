'use client';

import {Card, CardActions, CardContent, CardHeader, Typography} from '@/components/ui';
import {getDateWithTime} from '@/helpers';

import {alpha} from '@/lib/color';
import {useCssTokens} from '@/lib/cssTokens';
import type {CSSProperties} from 'react';
import NextRaceCountdown from './NextRaceCountdown';
import NextRaceSchedule from './NextRaceSchedule';
import useNextRaceData from './useNextRaceData';

type RaceWeekendProps = { season: number };

export default function RaceWeekend({season}: RaceWeekendProps) {
	const {data} = useNextRaceData(season);
	const race   = data?.race;
	const tokens = useCssTokens();
	
	if (!race) {
		return null;
	}
	
	const raceDate = new Date(`${race.date}T${race.time}`);
	
	const cardStyle: CSSProperties = {
		backgroundImage: `url(/carbon-fiber-texture.png)`,
		position:        'relative'
	};
	
	const overlayStyle: CSSProperties = {
		content:    '" "',
		position:   'absolute',
		left:       0,
		top:        0,
		height:     '100%',
		width:      '100%',
		zIndex:     0,
		background: alpha(tokens.secondary, 0.5)
	};
	
	return (
		<div className="col-span-12">
			<Card id="next-race-weekend" style={cardStyle} className="text-secondary-foreground bg-flame-800">
				<div style={overlayStyle}/>
				<CardHeader
					className="bg-transparent z-2"
					title={<span className="text-[30px]">{race.name}</span>}
					subheader={<span className="text-[18px]">{getDateWithTime(raceDate)}</span>}
					action={<NextRaceCountdown variant="dark" race={race}/>}
				/>
				<CardContent className="z-2">
					<Typography variant="body1" component="p">{race.name}</Typography>
				</CardContent>
				<CardActions className="p-0 mx-2 mb-2 z-2">
					<NextRaceSchedule race={race}/>
				</CardActions>
			</Card>
		</div>
	);
}
