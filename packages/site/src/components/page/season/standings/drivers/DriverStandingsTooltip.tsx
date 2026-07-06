import { Card, CardHeader, Grid } from '@mui/material';

import { DriverAvatar, DriverByLine } from '@/components/app';
import { PropertiesTable, PropertiesTableRow } from '@/components/ui';
import { useDriverHeaderSx } from '@/hooks';

import type { PointTooltipProps, PositionsChartTooltipProps } from '../charts';

export function DriverStandingsPositionTooltip({ serie }: PositionsChartTooltipProps) {
	const {
		data: {
			entity: { id, color }
		}
	} = serie;
	const headerSx = useDriverHeaderSx(id, color);

	return (
		<Card className="p-0">
			<Grid container className="items-center justify-stretch flex-nowrap">
				<DriverAvatar driverId={id} size={64} />
				<CardHeader
					className={headerSx.className}
					style={headerSx.style}
					title={<DriverByLine id={id} variant="name" />}
				/>
			</Grid>
		</Card>
	);
}

export function DriverStandingsPointsTooltip({ point }: PointTooltipProps) {
	const { data } = point;
	const { x } = data;
	const {
		points,
		position,
		entity: { id, color }
	} = data.data;
	const headerSx = useDriverHeaderSx(id, color);

	return (
		<Card className="p-0">
			<Grid container className="items-center justify-stretch flex-nowrap">
				<DriverAvatar driverId={id} size={64} />
				<CardHeader
					className={headerSx.className}
					style={headerSx.style}
					title={<DriverByLine id={id} variant="name" />}
				/>
			</Grid>
			<PropertiesTable>
				<PropertiesTableRow header="Round" align="right">{`${x}`}</PropertiesTableRow>
				<PropertiesTableRow header="Position" align="right">
					{position}
				</PropertiesTableRow>
				<PropertiesTableRow header="Points" align="right">
					{points}
				</PropertiesTableRow>
			</PropertiesTable>
		</Card>
	);
}
