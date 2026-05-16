import {DriverAvatar, DriverByLine} from '@/components/app';
import {PropertiesTable, PropertiesTableRow, PropertiesTableRowProps} from '@/components/ui';
import {BarTooltipProps} from '@nivo/bar';
import {capitalizeCamelCase} from '@/helpers';
import {useDriverHeaderSx} from '@/hooks';
import {Card, CardHeader} from '@mui/material';
import {breakdownMetrics} from './CareerBreakdownChart';
import {BreakdownDatum} from './useBreakdownData';

export default function BreakdownTooltip({data}: BarTooltipProps<BreakdownDatum>) {
	const {driverId, year, raw: metrics} = data;
	const headerSx                       = useDriverHeaderSx(driverId);
	
	const rows: PropertiesTableRowProps[] = breakdownMetrics.map((key) => ({
			key,
			header:   capitalizeCamelCase(String(key)),
			children: typeof metrics[key] !== 'undefined' ? metrics[key] : '--'
		})
	);
	
	rows.push({
		key:      'appearances',
		header:   "Appearances",
		children: metrics.appearances
	});
	
	return (
		<Card sx={{p: 0}}>
			<CardHeader sx={headerSx}
				avatar={<DriverAvatar driverId={driverId} size={42}/>}
				title={<DriverByLine id={driverId} variant="name"/>}
				subheader={year}
			/>
			<PropertiesTable>
				{rows.map(({key, ...row}) => <PropertiesTableRow key={key} {...row}/>)}
			</PropertiesTable>
		</Card>
	);
}