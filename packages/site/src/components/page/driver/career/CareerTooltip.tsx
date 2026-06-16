import { Card, CardHeader } from '@mui/material';

import { useTeamDisplay } from '@/components/app/EntityDisplayProvider';
import { PropertiesTable, PropertiesTableRow } from '@/components/ui';
import { useTeamHeaderSx } from '@/hooks';

// Synthesized by LineChartByTeam's tooltip slot — same shape its nivo
// predecessor produced (seriesId + data with x/y/raw fields). Inner data
// stays `any` to keep PropertiesTable's strict ReactElement children type
// happy with conditional rows (same trick as the legacy nivo version).
export type CareerTooltipProps = {
	point: {
		seriesId: string | number;
		// biome-ignore lint/suspicious/noExplicitAny: synthesized nivo-parity datum; precise typing resurfaces PropertiesTable's strict ReactElement-children rejection of conditional rows
		data: any;
	};
};

export default function CareerTooltip({ point }: CareerTooltipProps) {
	const { seriesId: teamId, data } = point;
	const { points, wins, position, grid } = data;
	const teamDisplay = useTeamDisplay(String(teamId));
	const headerSx = useTeamHeaderSx(String(teamId));

	return (
		<Card className="p-0">
			<CardHeader
				className={headerSx.className}
				style={headerSx.style}
				title={point.data.xFormatted}
				subheader={teamDisplay?.name}
			/>
			<PropertiesTable>
				{grid && (
					<PropertiesTableRow header="Qualifying" align="right">
						{grid}
					</PropertiesTableRow>
				)}
				{position && (
					<PropertiesTableRow header="Position" align="right">
						{position}
					</PropertiesTableRow>
				)}
				{typeof points !== 'undefined' && (
					<PropertiesTableRow header="Points" align="right">
						{points}
					</PropertiesTableRow>
				)}
				{typeof wins !== 'undefined' && (
					<PropertiesTableRow header="Wins" align="right">
						{wins}
					</PropertiesTableRow>
				)}
			</PropertiesTable>
		</Card>
	);
}
