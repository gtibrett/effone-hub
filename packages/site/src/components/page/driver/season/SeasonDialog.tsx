'use client';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog } from '@gtibrett/mui-additions';
import { Typography } from '@mui/material';

import { DriverByLine } from '@/components/app';
import type { DriverId } from '@/types';

import Season from './Season';
import useSeasonData from './useSeasonData';

type SeasonDialogProps = {
	season: number | undefined;
	driverId: DriverId;
	onClose: () => void;
};

/** Inner component so the hook only runs when dialog is open (season is set). */
function SeasonDialogContent({ season, driverId }: { season: number; driverId: DriverId }) {
	const { data, loading } = useSeasonData(driverId, season);
	const races = data?.races ?? [];
	return (
		<Season
			season={season}
			driverId={driverId || ''}
			races={races}
			careerData={null}
			currentSeasonTeam={null}
		/>
	);
}

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
			{season && <SeasonDialogContent season={season} driverId={driverId} />}
		</Dialog>
	);
}
