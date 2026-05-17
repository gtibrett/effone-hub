import {Card} from '@/components/ui';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/shadcn/table';
import {getDateWithTime} from '@/helpers';

import useRaceScheduleEvents, {ScheduleEvent} from './useRaceScheduleEvents';
import {NextRace} from './useNextRaceData';

const ScheduleCell = ({date, time, asDate}: Pick<ScheduleEvent, 'date' | 'time' | 'asDate'>) => {
	return date && time ? getDateWithTime(asDate) : '--';
};

export default function NextRaceSchedule({race}: { race: NextRace }) {
	const scheduleEvents = useRaceScheduleEvents(race);

	return (
		<Card className="w-full">
			<Table className="w-full">
				<TableHeader>
					<TableRow>
						{scheduleEvents.map(({label}) => (
							<TableHead
								key={label}
								scope="col"
								style={{width: `${100 / scheduleEvents.length}%`}}
							>
								{label}
							</TableHead>
						))}
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow>
						{scheduleEvents.map(({label, date, time, asDate}) => (
							<TableCell key={label}>
								<ScheduleCell date={date} time={time} asDate={asDate}/>
							</TableCell>
						))}
					</TableRow>
				</TableBody>
			</Table>
		</Card>
	);
}
