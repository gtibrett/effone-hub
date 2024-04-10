import {getDateWithTime} from '@effonehub/helpers';
import {Race} from '@gtibrett/effone-hub-graph-api';
import {Card, Table, TableBody, TableCell, TableHead, TableRow} from '@mui/material';
import useRaceScheduleEvents, {ScheduleEvent} from './useRaceScheduleEvents';

const ScheduleCell = ({date, time, asDate}: Pick<ScheduleEvent, 'date' | 'time' | 'asDate'>) => {
	return date && time ? getDateWithTime(asDate) : '--';
};

export default function NextRaceSchedule({race}: { race: Race }) {
	const scheduleEvents = useRaceScheduleEvents(race);
	
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
						{scheduleEvents.map(({label, date, time, asDate}) => (
								<TableCell component="td" variant="body" key={label}>
									<ScheduleCell date={date} time={time} asDate={asDate}/>
								</TableCell>
							)
						)}
					</TableRow>
				</TableBody>
			</Table>
		</Card>
	);
}