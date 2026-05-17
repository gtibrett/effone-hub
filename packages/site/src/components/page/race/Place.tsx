import {Link} from '@/components/ui';
import {DriverAvatar} from '@/components/app';
import {useDriver} from '@/hooks/data';
import {DriverId} from '@/types';
import {faAsterisk} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Card, CardHeader, SxProps, Typography} from '@mui/material';

type PlaceProps = {
	driverId?: DriverId;
	place?: number | string;
	points?: number | string;
	wins?: number | string;
	asterisk?: boolean;
	sx?: SxProps;
}

export default function Place({driverId, place, points, wins, asterisk = false, sx = {}}: PlaceProps) {
	const driver = useDriver(driverId);
	
	if (!driver) {
		return null;
	}
	
	const {firstName, lastName, rowId} = driver;
	const name                         = `${firstName} ${lastName}`;

	return (
		<Card sx={sx}>
			<CardHeader
				avatar={<DriverAvatar driverId={driverId} size={64}/>}
				title={<Typography noWrap><Link href={`/drivers/${rowId}`}>{name}</Link> {asterisk && <FontAwesomeIcon icon={faAsterisk} title="We all know what really happened"/>}</Typography>}
				subheader={<>
					{place ? `P${place} ` : ''}
					{points ? <Typography variant="caption"><span className="inline-block border-l mx-2 h-3 align-middle"/> {points} pts</Typography> : ''}
					{typeof wins === 'number' ? <Typography variant="caption"><span className="inline-block border-l mx-2 h-3 align-middle"/> {wins} wins</Typography> : ''}
				</>}
			/>
		</Card>
	);
}