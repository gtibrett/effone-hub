import {DriverByLine} from '@/components/app';
import {DriverId} from '@/types';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Dialog} from '@gtibrett/mui-additions';
import {Typography} from '@mui/material';
import Season from './Season';

type SeasonDialogProps = {
	season: number | undefined;
	driverId: DriverId;
	onClose: () => void;
};

export default function SeasonDialog({driverId, season, onClose}: SeasonDialogProps) {
	return (
		<Dialog
			open={!!season} closeIcon={<FontAwesomeIcon fixedWidth icon={faTimes}/>} onClose={onClose} maxWidth="lg" fullWidth
			title={
				<>
					{season} Season
					<Typography paragraph variant="subtitle1"><DriverByLine id={driverId} variant="name"/></Typography>
				</>
			}>
			{season && <Season season={season} driverId={driverId}/>}
		</Dialog>
	);
}