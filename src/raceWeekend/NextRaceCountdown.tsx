import {Card, Table, TableBody, TableCell, TableHead, TableRow} from '@mui/material';
import {ReactNode, useEffect, useState} from 'react';
import CountdownClock from './CountdownClock';
import {RaceData} from './useNextRaceData';

type NextRaceCountdownProps = {
	race: RaceData;
	mapSize?: number;
	circuitSize?: number;
}

type ScheduleEvent = {
	label: string
	date?: string;
	time?: string;
	conditional?: boolean
}

const CountdownCell = ({date, time, label}: Pick<ScheduleEvent, 'date' | 'time' | 'label'>) => {
	const [now, setNow] = useState(new Date());
	const timeTo        = Math.floor(((new Date(`${date} ${time} UTC`)).getTime() - now.getTime()) / 1000);
	
	useEffect(() => {
		setInterval(() => {
			setNow(new Date());
		}, 1000);
	}, [setNow]);
	
	let content: ReactNode = '--';
	if (date && time) {
		content = timeTo > 0 ? <CountdownClock timeTo={timeTo} size="small"/> : 'Done';
	}
	
	return (
		<TableCell component="td" variant="body">{content}</TableCell>
	);
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
						{scheduleEvents.map(({label, date, time}) => <CountdownCell key={label} label={label} date={date} time={time}/>)}
					</TableRow>
				</TableBody>
			</Table>
		</Card>
	);
}