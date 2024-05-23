import {DriverAvatar, DriverByLine, useDriverHeaderSx} from '@effonehub/driver';
import {capitalizeCamelCase} from '@effonehub/helpers';
import {PropertiesTable, PropertiesTableRow} from '@effonehub/ui-components';
import {PropertiesTableRowProps} from '@effonehub/ui-components/propertiesTable/PropertiesTableRow';
import {Card, CardHeader} from '@mui/material';
import {BarTooltipProps} from '@nivo/bar';
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