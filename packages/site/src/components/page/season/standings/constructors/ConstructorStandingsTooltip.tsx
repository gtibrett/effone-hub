import {PropertiesTable, PropertiesTableRow, Card, CardHeader} from '@/components/ui';
import {useTeamHeaderSx} from '@/hooks';
import type {CSSProperties} from 'react';

import {PointTooltipProps, PositionsChartTooltipProps} from '../charts';

export function ConstructorStandingsPositionTooltip({serie}: PositionsChartTooltipProps) {
	const {data: {entity: {name, id}}} = serie;
	const c                            = useTeamHeaderSx(id);

	return (
		<div style={{'--team-primary': c.primary, '--team-foreground': c.foreground} as CSSProperties}>
			<Card>
				<CardHeader className="bg-team-primary text-team-foreground" title={name}/>
			</Card>
		</div>
	);
}

export function ConstructorStandingsPointsTooltip({point}: PointTooltipProps) {
	const {data}                                 = point;
	const {x}                                    = data;
	const {points, position, entity: {id, name}} = data.data;
	const c                                      = useTeamHeaderSx(id);

	return (
		<div style={{'--team-primary': c.primary, '--team-foreground': c.foreground} as CSSProperties}>
			<Card>
				<CardHeader className="bg-team-primary text-team-foreground" title={name}/>
				<PropertiesTable>
					<PropertiesTableRow header="Round" align="right">{`${x}`}</PropertiesTableRow>
					<PropertiesTableRow header="Position" align="right">{position}</PropertiesTableRow>
					<PropertiesTableRow header="Points" align="right">{points}</PropertiesTableRow>
				</PropertiesTable>
			</Card>
		</div>
	);
}
