import {PropertiesTable, PropertiesTableRow} from '@/components/ui';
import {useTeamHeaderSx} from '@/hooks';
import {useTeam} from '@/hooks/data';
import {Card, CardHeader} from '@mui/material';
import {PointTooltipProps} from '@nivo/line';

export default function CareerTooltip({point}: PointTooltipProps) {
	const {serieId: teamId, data} = point;
	
	// @ts-ignore
	const {points, wins, position, grid} = data; // extra added to make tooltip better
	const {team}                         = useTeam(teamId);
	const headerSx                       = useTeamHeaderSx(Number(teamId));
	
	return (
		<Card sx={{p: 0}}>
			<CardHeader sx={headerSx} title={point.data.xFormatted} subheader={team?.name}/>
			<PropertiesTable>
				{grid && <PropertiesTableRow header="Qualifying" align="right">{grid}</PropertiesTableRow>}
				{position && <PropertiesTableRow header="Position" align="right">{position}</PropertiesTableRow>}
				{typeof points !== 'undefined' && <PropertiesTableRow header="Points" align="right">{points}</PropertiesTableRow>}
				{typeof wins !== 'undefined' && <PropertiesTableRow header="Wins" align="right">{wins}</PropertiesTableRow>}
			</PropertiesTable>
		</Card>
	);
}