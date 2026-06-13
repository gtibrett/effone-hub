import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@mui/material';

import { DriverByLine } from '@/components/app';
import { Dialog } from '@/lib/mui-additions';
import type { DriverId } from '@/types';

import Season from './Season';

type SeasonDialogProps = {
	season: number | undefined;
	driverId: DriverId;
	onClose: () => void;
};

export default function SeasonDialog({ driverId, season, onClose }: SeasonDialogProps) {
	return (
		<Dialog
			open={!!season}
			closeIcon={<FontAwesomeIcon fixedWidth icon={faTimes} />}
			onClose={onClose}
			maxWidth="lg"
			fullWidth
			title={
				<>
					{season} Season
					<Typography variant="subtitle1" className="mb-4">
						<DriverByLine id={driverId} variant="name" />
					</Typography>
				</>
			}
		>
			{season && <Season season={season} driverId={driverId || ''} />}
		</Dialog>
	);
}
