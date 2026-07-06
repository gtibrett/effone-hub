import { Card, CardHeader } from '@mui/material';

import { PropertiesTable, PropertiesTableRow } from '@/components/ui';
import { toPoints } from '@/helpers';
import { useTeamHeaderSx } from '@/hooks';

// Synthesized by HistoryChart's tooltip slot — mirrors nivo's PointTooltipProps
// shape so this component stays close to its previous structure.
export type HistoryTooltipProps = {
	point: {
		data: {
			x: number | string;
			xFormatted?: string;
			y: number | null | undefined;
			// biome-ignore lint/suspicious/noExplicitAny: synthesized nivo-parity datum; typing the fields precisely resurfaces PropertiesTable's strict ReactElement-children rejection of conditional rows
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
			<CardHeader className={headerSx.className} style={headerSx.style} title={name} />
			<PropertiesTable>
				<PropertiesTableRow header="Year" align="right">
					{data.xFormatted ?? String(data.x)}
				</PropertiesTableRow>
				{positionNumber && (
					<PropertiesTableRow header="Position" align="right">
						{positionNumber}
					</PropertiesTableRow>
				)}
				{typeof points !== 'undefined' && (
					<PropertiesTableRow header="Points" align="right">
						{toPoints(points)}
					</PropertiesTableRow>
				)}
			</PropertiesTable>
		</Card>
	);
}
