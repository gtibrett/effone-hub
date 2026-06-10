import { Card, CardHeader } from '@mui/material';

import { PropertiesTable, PropertiesTableRow } from '@/components/ui';
import { getTimeStringFromDate } from '@/helpers';

export type LapTimesYearStats = {
	min: number;
	p10: number;
	p25: number;
	p50: number;
	p75: number;
	p90: number;
	max: number;
};

type LapTimesByYearTooltipProps = {
	label: string;
	stats: LapTimesYearStats;
};

export default function LapTimesByYearTooltip({ label, stats }: LapTimesByYearTooltipProps) {
	return (
		<Card>
			<CardHeader title={label} />
			<PropertiesTable>
				<PropertiesTableRow header="Fastest">
					{getTimeStringFromDate(new Date(stats.min))}
				</PropertiesTableRow>
				<PropertiesTableRow header="10th %">
					{getTimeStringFromDate(new Date(stats.p10))}
				</PropertiesTableRow>
				<PropertiesTableRow header="25th %">
					{getTimeStringFromDate(new Date(stats.p25))}
				</PropertiesTableRow>
				<PropertiesTableRow header="50th %">
					{getTimeStringFromDate(new Date(stats.p50))}
				</PropertiesTableRow>
				<PropertiesTableRow header="75th %">
					{getTimeStringFromDate(new Date(stats.p75))}
				</PropertiesTableRow>
				<PropertiesTableRow header="90th %">
					{getTimeStringFromDate(new Date(stats.p90))}
				</PropertiesTableRow>
				<PropertiesTableRow header="Slowest">
					{getTimeStringFromDate(new Date(stats.max))}
				</PropertiesTableRow>
			</PropertiesTable>
		</Card>
	);
}
