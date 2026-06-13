import { Card, CardHeader } from '@mui/material';

import { DriverAvatar, DriverByLine } from '@/components/app';
import { PropertiesTable, PropertiesTableRow } from '@/components/ui';
import { getTimeStringFromDate } from '@/helpers';
import { useDriverHeaderSx } from '@/hooks';

import type { PitStopSerie } from './PitStopsChart';

type PitStopTooltipProps = {
	value: number;
	id: string | number;
	data: PitStopSerie;
};

export default function PitStopTooltip(props: PitStopTooltipProps) {
	const { value, id, data } = props;
	const { driverId } = data;
	const headerSx = useDriverHeaderSx(driverId);

	return (
		<Card className="p-0">
			<CardHeader
				className={headerSx.className}
				style={headerSx.style}
				avatar={<DriverAvatar driverId={driverId} size={42} />}
				title={<DriverByLine id={driverId} variant="name" />}
				subheader={
					<PropertiesTable>
						<PropertiesTableRow header={`Stop ${id}`}>
							{getTimeStringFromDate(new Date(value))}
						</PropertiesTableRow>
					</PropertiesTable>
				}
			/>
		</Card>
	);
}
