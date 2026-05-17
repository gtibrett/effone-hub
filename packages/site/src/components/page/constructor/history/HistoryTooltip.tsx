import {PropertiesTable, PropertiesTableRow, Card, CardHeader} from '@/components/ui';
import {useTeamHeaderSx} from '@/hooks';
import type {CSSProperties} from 'react';
import {PointTooltipProps} from '@nivo/line';

export default function HistoryTooltip(props: PointTooltipProps) {
	const {point}                                = props;
	const {data}                                 = point;
	// @ts-ignore
	const {points, positionNumber, name, id} = data.data; // extra added to make tooltip better
	const hc                                 = useTeamHeaderSx(id);

	return (
		<div style={{'--team-primary': hc.primary, '--team-foreground': hc.foreground} as CSSProperties}>
		<Card className="p-0">
			<CardHeader className="bg-team-primary text-team-foreground" title={name} subheader={point.data.xFormatted}/>
			<PropertiesTable>
				{positionNumber && <PropertiesTableRow header="Position" align="right">{positionNumber}</PropertiesTableRow>}
				{typeof points !== 'undefined' && <PropertiesTableRow header="Points" align="right">{points}</PropertiesTableRow>}
			</PropertiesTable>
		</Card>
		</div>
	);
}