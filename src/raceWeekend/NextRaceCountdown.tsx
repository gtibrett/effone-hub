import {Race} from '@gtibrett/effone-hub-graph-api';
import {Card, Table, TableBody, TableCell, TableHead, TableRow} from '@mui/material';
import {Maybe} from '@gtibrett/effone-hub-graph-api/types';
import {ReactNode, useEffect, useState} from 'react';
import CountdownClock from './CountdownClock';

type NextRaceCountdownProps = {
	race: Race;
	mapSize?: number;
	circuitSize?: number;
}

type ScheduleEvent = {
	label: string
	date?: Maybe<string> | undefined;
	time?: Maybe<string> | undefined;
	conditional?: boolean
}

const CountdownCell = ({date, time}: Pick<ScheduleEvent, 'date' | 'time'>) => {
	const [now, setNow] = useState(new Date());
	const timeTo        = Math.floor(((new Date(`${date} ${time} UTC`)).getTime() - now.getTime()) / 1000);
	
	useEffect(() => {
		const interval = setInterval(() => setNow(new Date()), 1000);
		return () => clearInterval(interval);
	}, [timeTo]);
	
	
	let content: ReactNode = '--';
	if (date && time) {
		content = timeTo > 0 ? <CountdownClock timeTo={timeTo} size="small"/> : 'Done';
	}
	
	return content;
};

export default function NextRaceCountdown({race}: NextRaceCountdownProps) {
	const {
		      fp1Date, fp1Time,
		      fp2Date, fp2Time,
		      fp3Date, fp3Time,
		      qualiDate, qualiTime,
		      sprintDate, sprintTime,
		      date, time
	      } = race;
	
	const isSprint = (!!sprintDate && !!sprintTime);
	
	const scheduleEvents: ScheduleEvent[] = [
		{label: 'FP1', date: fp1Date, time: fp1Time, conditional: isSprint || !isSprint},
		{label: 'FP2', date: fp2Date, time: fp2Time, conditional: !isSprint},
		{label: 'FP3', date: fp3Date, time: fp3Time, conditional: !isSprint},
		{label: 'Sprint Qual', date: fp2Date, time: fp2Time, conditional: isSprint},
		{label: 'Sprint', date: sprintDate, time: sprintTime, conditional: isSprint},
		{label: 'Qual', date: qualiDate, time: qualiTime, conditional: isSprint || !isSprint},
		{label: 'Race', date, time, conditional: isSprint || !isSprint}
	].filter(({conditional}) => conditional);
	
	return (
		<Card sx={{width: '100%'}}>
			<Table size="small" sx={{width: '100%'}}>
				<TableHead>
					<TableRow>
						{scheduleEvents.map(({label}) => <TableCell width={`${100 / scheduleEvents.length}%`} key={label} component="th" scope="col" variant="head">{label}</TableCell>)}
					</TableRow>
				</TableHead>
				<TableBody sx={{'& tr:last-child .MuiTableCell-root': {borderBottom: 0}}}>
					<TableRow>
						{scheduleEvents.map(({label, date, time}) => (
								<TableCell component="td" variant="body" key={label}>
									<CountdownCell date={date} time={time}/>
								</TableCell>
							)
						)}
					</TableRow>
				</TableBody>
			</Table>
		</Card>
	);
}