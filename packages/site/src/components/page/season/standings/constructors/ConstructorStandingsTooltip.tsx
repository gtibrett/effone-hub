import { Card, CardHeader } from '@mui/material';

import { PropertiesTable, PropertiesTableRow } from '@/components/ui';
import { useTeamHeaderSx } from '@/hooks';

import type { PointTooltipProps, PositionsChartTooltipProps } from '../charts';

export function ConstructorStandingsPositionTooltip({ serie }: PositionsChartTooltipProps) {
	const {
		data: {
			entity: { name, id }
		}
	} = serie;
	const headerSx = useTeamHeaderSx(id);

	return (
		<Card className="p-0">
			<CardHeader className={headerSx.className} style={headerSx.style} title={name} />
		</Card>
	);
}

export function ConstructorStandingsPointsTooltip({ point }: PointTooltipProps) {
	const { data } = point;
	const { x } = data;
	const {
		points,
		position,
		entity: { id, name }
	} = data.data;
	const headerSx = useTeamHeaderSx(id);

	return (
		<Card className="p-0">
			<CardHeader className={headerSx.className} style={headerSx.style} title={name} />
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
