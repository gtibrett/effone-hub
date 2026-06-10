import { Card, CardHeader } from '@mui/material';

import { PropertiesTable, PropertiesTableRow } from '@/components/ui';
import { useTeamHeaderSx } from '@/hooks';

// Synthesized by HistoryChart's tooltip slot — mirrors nivo's PointTooltipProps
// shape so this component stays close to its previous structure.
export type HistoryTooltipProps = {
	point: {
		data: {
			x: number | string;
			xFormatted?: string;
			y: number | null | undefined;
			// any: keeps PropertiesTable's strict ReactElement children type
			// happy with conditional rows (same trick as the legacy nivo version)
			data: any;
		};
	};
};

export default function HistoryTooltip({ point }: HistoryTooltipProps) {
	const { data } = point;
	const { points, positionNumber, name, id } = data.data;
	const headerSx = useTeamHeaderSx(id);

	return (
		<Card className="p-0">
			<CardHeader
				className={headerSx.className}
				style={headerSx.style}
				title={name}
				subheader={data.xFormatted ?? String(data.x)}
			/>
			<PropertiesTable>
				{positionNumber && (
					<PropertiesTableRow header="Position" align="right">
						{positionNumber}
					</PropertiesTableRow>
				)}
				{typeof points !== 'undefined' && (
					<PropertiesTableRow header="Points" align="right">
						{points}
					</PropertiesTableRow>
				)}
			</PropertiesTable>
		</Card>
	);
}
