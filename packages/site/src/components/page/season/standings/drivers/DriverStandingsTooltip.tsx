import {DriverAvatar, DriverByLine} from '@/components/app';
import {PropertiesTable, PropertiesTableRow, Card, CardHeader} from '@/components/ui';
import {useDriverHeaderSx} from '@/hooks';
import type {CSSProperties} from 'react';

import {PointTooltipProps, PositionsChartTooltipProps} from '../charts';

export function DriverStandingsPositionTooltip({serie}: PositionsChartTooltipProps) {
	const {data: {entity: {id}, color}} = serie;
	const c                             = useDriverHeaderSx(id, color);

	return (
		<div style={{'--team-primary': c.primary, '--team-foreground': c.foreground} as CSSProperties}>
			<Card>
				<CardHeader className="bg-team-primary text-team-foreground" title={<DriverByLine id={id} variant="name"/>} avatar={<DriverAvatar driverId={id} size={42}/>}/>
			</Card>
		</div>
	);
}

export function DriverStandingsPointsTooltip({point}: PointTooltipProps) {
	const {data}                                  = point;
	const {x}                                     = data;
	const {points, position, entity: {id, color}} = data.data;
	const c                                       = useDriverHeaderSx(id, color);

	return (
		<div style={{'--team-primary': c.primary, '--team-foreground': c.foreground} as CSSProperties}>
			<Card>
				<CardHeader className="bg-team-primary text-team-foreground" title={<DriverByLine id={id} variant="name"/>} avatar={<DriverAvatar driverId={id} size={42}/>}/>
				<PropertiesTable>
					<PropertiesTableRow header="Round" align="right">{`${x}`}</PropertiesTableRow>
					<PropertiesTableRow header="Position" align="right">{position}</PropertiesTableRow>
					<PropertiesTableRow header="Points" align="right">{points}</PropertiesTableRow>
				</PropertiesTable>
			</Card>
		</div>
	);
}
