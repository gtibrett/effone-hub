import {PropertiesTable, PropertiesTableRow} from '@/components/ui';
import {useTeamHeaderSx} from '@/hooks';
import {Card, CardHeader} from '@mui/material';
import {PointTooltipProps} from '@nivo/line';

export default function HistoryTooltip(props: PointTooltipProps) {
	const {point}                                = props;
	const {data}                                 = point;
	// @ts-ignore
	const {points, positionNumber, name, id} = data.data; // extra added to make tooltip better
	const headerSx                           = useTeamHeaderSx(id);
	
	return (
		<Card className="p-0">
			<CardHeader className={headerSx.className} style={headerSx.style} title={name} subheader={point.data.xFormatted}/>
			<PropertiesTable>
				{positionNumber && <PropertiesTableRow header="Position" align="right">{positionNumber}</PropertiesTableRow>}
				{typeof points !== 'undefined' && <PropertiesTableRow header="Points" align="right">{points}</PropertiesTableRow>}
			</PropertiesTable>
		</Card>
	);
}