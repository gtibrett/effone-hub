import {Grid, Typography} from '@mui/material';
import Flag, {FlagProps} from '../flags/Flag';
import Link from '../ui-components/Link';
import DriverAvatar, {DriverAvatarProps} from './DriverAvatar';
import {DriverId, useDriver} from './DriverProvider';

type ByLineProps = {
	id: DriverId;
	variant?: 'code' | 'name' | 'full';
	avatarProps?: Omit<DriverAvatarProps, 'id'>
	flagProps?: Omit<FlagProps, 'nationality'>
}


export default function ByLine({id, variant = 'full', avatarProps = {}, flagProps={ size: 16}}: ByLineProps) {
	const driver = useDriver(id);
	
	if (!driver) {
		return null;
	}
	
	const {driverId, givenName, familyName, nationality, code} = driver;
	const name                                                 = `${givenName} ${familyName}`;
	
	switch (variant) {
		case 'code':
			return <>{code}</>;
		case 'name':
			return <>{name}</>;
		
		case 'full':
			return (
				<Grid container spacing={1} alignItems="center" sx={{flexWrap: 'nowrap'}}>
					<Grid item><DriverAvatar id={id} {...avatarProps}/></Grid>
					<Grid item><Typography><Link to={`/driver/${driverId}`}>{name}</Link></Typography></Grid>
					<Grid item><Typography><Flag nationality={nationality} {...flagProps}/></Typography></Grid>
				</Grid>
			);
	}
	
	return null;
}