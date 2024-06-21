import {PropertiesTable, PropertiesTableRow} from '@/components/ui';
import {useTeamHeaderSx} from '@/hooks';
import {Card, CardHeader} from '@mui/material';
import {PointTooltipProps} from '@nivo/line';

export default function HistoryTooltip(props: PointTooltipProps) {
	const {point}                                = props;
	const {data}                                 = point;
	// @ts-ignore
	const {points, wins, position, name, teamId} = data.data; // extra added to make tooltip better
	const headerSx                               = useTeamHeaderSx(Number(teamId));
	
	return (
		<Card sx={{p: 0}}>
			<CardHeader sx={headerSx} title={name} subheader={point.data.xFormatted}/>
			<PropertiesTable>
				{position && <PropertiesTableRow header="Position" align="right">{position}</PropertiesTableRow>}
				{typeof points !== 'undefined' && <PropertiesTableRow header="Points" align="right">{points}</PropertiesTableRow>}
				{typeof wins !== 'undefined' && <PropertiesTableRow header="Wins" align="right">{wins}</PropertiesTableRow>}
			</PropertiesTable>
		</Card>
	);
}