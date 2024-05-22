import {getTimeStringFromDate} from '@effonehub/helpers';
import {PropertiesTable, PropertiesTableRow} from '@effonehub/ui-components';
import {Card, CardHeader} from '@mui/material';
import {ComputedBoxPlotSummary} from '@nivo/boxplot/dist/types/types';

type LapTimesByYearTooltipProps = Pick<ComputedBoxPlotSummary,
	'color' |
	'data' |
	'formatted' |
	'label'
>

export default function LapTimesByYearTooltip({data, label}: LapTimesByYearTooltipProps) {
	return (
		<Card>
			<CardHeader title={label}/>
			<PropertiesTable>
				<PropertiesTableRow header="Fastest">{getTimeStringFromDate(new Date(data.extrema[0]))}</PropertiesTableRow>
				<PropertiesTableRow header="10th %">{getTimeStringFromDate(new Date(data.values[0]))}</PropertiesTableRow>
				<PropertiesTableRow header="25th %">{getTimeStringFromDate(new Date(data.values[1]))}</PropertiesTableRow>
				<PropertiesTableRow header="50th %">{getTimeStringFromDate(new Date(data.values[2]))}</PropertiesTableRow>
				<PropertiesTableRow header="75th %">{getTimeStringFromDate(new Date(data.values[3]))}</PropertiesTableRow>
				<PropertiesTableRow header="90th %">{getTimeStringFromDate(new Date(data.values[4]))}</PropertiesTableRow>
				<PropertiesTableRow header="Slowest">{getTimeStringFromDate(new Date(data.extrema[1]))}</PropertiesTableRow>
			</PropertiesTable>
		</Card>
	);
}