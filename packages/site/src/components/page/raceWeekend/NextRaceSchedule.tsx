import { Card, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

import { getDateWithTime } from '@/helpers';

import type { NextRace } from './useNextRaceData';
import useRaceScheduleEvents, { type ScheduleEvent } from './useRaceScheduleEvents';

const ScheduleCell = ({ date, time, asDate }: Pick<ScheduleEvent, 'date' | 'time' | 'asDate'>) => {
	return date && time ? getDateWithTime(asDate) : '--';
};

export default function NextRaceSchedule({ race }: { race: NextRace }) {
	const scheduleEvents = useRaceScheduleEvents(race);

	return (
		<Card className="w-full">
			<Table size="small" className="w-full">
				<TableHead>
					<TableRow>
						{scheduleEvents.map(({ label }) => (
							<TableCell
								width={`${100 / scheduleEvents.length}%`}
								key={label}
								component="th"
								scope="col"
								variant="head"
							>
								{label}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody className="[&_tr:last-child_.MuiTableCell-root]:border-b-0">
					<TableRow>
						{scheduleEvents.map(({ label, date, time, asDate }) => (
							<TableCell component="td" variant="body" key={label}>
								<ScheduleCell date={date} time={time} asDate={asDate} />
							</TableCell>
						))}
					</TableRow>
				</TableBody>
			</Table>
		</Card>
	);
}
