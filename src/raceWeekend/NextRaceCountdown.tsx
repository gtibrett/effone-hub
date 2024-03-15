import {Card, CardContent, Table, TableBody, TableCell, TableRow} from '@mui/material';
import {useEffect, useState} from 'react';
import CountdownClock from './CountdownClock';
import {RaceData} from './useNextRaceData';

type NextRaceCountdownProps = {
	race: RaceData;
	mapSize?: number;
	circuitSize?: number;
}

type CountdownRowProps = {
	date?: string;
	time?: string;
	label: string
}

const CountdownRow = ({date, time, label}: CountdownRowProps) => {
	const [now, setNow] = useState(new Date());
	const timeTo        = Math.floor(((new Date(`${date} ${time} UTC`)).getTime() - now.getTime()) / 1000);
	
	useEffect(() => {
		setInterval(() => {
			setNow(new Date());
		}, 1000);
	}, [setNow]);
	
	if (!date || !time) {
		return null;
	}
	
	return (
		<TableRow>
			<TableCell component="th" scope="row">
				{label}
			</TableCell>
			<TableCell align="right">
				{timeTo > 0 ? <CountdownClock timeTo={timeTo} size="small"/> : 'Done'}
			</TableCell>
		</TableRow>
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
	
	console.log(sprintDate, sprintTime);
	
	const isSprint = (!!sprintDate && !!sprintTime);
	
	return (
		<Card variant="outlined">
			<CardContent sx={{p: 1, pb: `${8}px !important`}}>
				<Table size="small">
					<TableBody sx={{'& tr:last-child .MuiTableCell-root': {borderBottom: 0}}}>
						<CountdownRow label="FP1" date={fp1Date} time={fp1Time}/>
						{!isSprint && <CountdownRow label="FP2" date={fp2Date} time={fp2Time}/>}
						<CountdownRow label="FP3" date={fp3Date} time={fp3Time}/>
						<CountdownRow label="Qual" date={qualiDate} time={qualiTime}/>
						{isSprint && <CountdownRow label="Shootout" date={fp2Date} time={fp2Time}/>}
						<CountdownRow label="Sprint" date={sprintDate} time={sprintTime}/>
						<CountdownRow label="Race" date={date} time={time}/>
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}