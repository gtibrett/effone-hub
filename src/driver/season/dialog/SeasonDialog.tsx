import {DriverByLine, DriverId} from '@effonehub/driver';
import Season from '@effonehub/driver/season/Season';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Dialog} from '@gtibrett/mui-additions';
import {Typography} from '@mui/material';

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