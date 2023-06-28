import {Race} from '@gtibrett/effone-hub-api';
import {Card, CardContent, Table, TableBody, TableCell, TableRow} from '@mui/material';
import {useEffect, useState} from 'react';
import CountdownClock from './CountdownClock';

type NextRaceCountdownProps = {
	race: Race;
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
	const timeTo        = Math.floor(((new Date(`${date} ${time}`)).getTime() - now.getTime()) / 1000);
	
	useEffect(() => {
		setInterval(() => {
			setNow(new Date());
		}, 1000);
	}, [setNow]);
	
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
	const {FirstPractice, SecondPractice, ThirdPractice, Qualifying} = race;
	
	return (
		<Card variant="outlined">
			<CardContent sx={{p: 1, pb: `${8}px !important`}}>
				<Table size="small">
					<TableBody sx={{'& tr:last-child .MuiTableCell-root': {borderBottom: 0}}}>
						{FirstPractice && <CountdownRow label="FP1" {...FirstPractice}/>}
						{SecondPractice && <CountdownRow label="FP2" {...SecondPractice}/>}
						{ThirdPractice && <CountdownRow label="FP3" {...ThirdPractice}/>}
						{Qualifying && <CountdownRow label="Qual" {...Qualifying}/>}
						{Qualifying && <CountdownRow label="Race" {...race}/>}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}