import {DriverAvatar, DriverByLine} from '@/components/app';
import {PropertiesTable, PropertiesTableRow, PropertiesTableRowProps, Card, CardHeader} from '@/components/ui';
import {BarTooltipProps} from '@nivo/bar';
import {capitalizeCamelCase} from '@/helpers';
import {useDriverHeaderSx} from '@/hooks';
import type {CSSProperties} from 'react';
import {breakdownMetrics} from './CareerBreakdownChart';
import {BreakdownDatum} from './useBreakdownData';

export default function BreakdownTooltip({data}: BarTooltipProps<BreakdownDatum>) {
	const {driverId, year, raw: metrics} = data;
	const hc                             = useDriverHeaderSx(driverId);

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
		<div style={{'--team-primary': hc.primary, '--team-foreground': hc.foreground} as CSSProperties}>
		<Card className="p-0">
			<CardHeader className="bg-team-primary text-team-foreground"
				avatar={<DriverAvatar driverId={driverId} size={42}/>}
				title={<DriverByLine id={driverId} variant="name"/>}
				subheader={year}
			/>
			<PropertiesTable>
				{rows.map(({key, ...row}) => <PropertiesTableRow key={key} {...row}/>)}
			</PropertiesTable>
		</Card>
		</div>
	);
}