import { Card, CardHeader } from '@mui/material';

import { DriverAvatar, DriverByLine } from '@/components/app';
import { PropertiesTable, PropertiesTableRow, type PropertiesTableRowProps } from '@/components/ui';
import { capitalizeCamelCase } from '@/helpers';
import { useDriverHeaderSx } from '@/hooks';

import { breakdownMetrics } from './CareerBreakdownChart';
import type { BreakdownDatum } from './useBreakdownData';

type BreakdownTooltipProps = { datum: BreakdownDatum };

export default function BreakdownTooltip({ datum }: BreakdownTooltipProps) {
	const { driverId, year, raw: metrics } = datum;
	const headerSx = useDriverHeaderSx(driverId);

	const rows: PropertiesTableRowProps[] = breakdownMetrics.map(key => ({
		key,
		header: capitalizeCamelCase(String(key)),
		children: typeof metrics[key] !== 'undefined' ? metrics[key] : '--'
	}));

	rows.push({
		key: 'appearances',
		header: 'Appearances',
		children: metrics.appearances
	});

	return (
		<Card className="p-0">
			<CardHeader
				className={headerSx.className}
				style={headerSx.style}
				avatar={<DriverAvatar driverId={driverId} size={42} />}
				title={<DriverByLine id={driverId} variant="name" />}
				subheader={year}
			/>
			<PropertiesTable>
				{rows.map(({ key, ...row }) => (
					<PropertiesTableRow key={key} {...row} />
				))}
			</PropertiesTable>
		</Card>
	);
}
