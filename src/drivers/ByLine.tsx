import {Grid, Hidden, Skeleton, Typography} from '@mui/material';
import Flag, {FlagProps} from '../flags/Flag';
import {Link} from '@gtibrett/mui-additions';
import DriverAvatar, {DriverAvatarProps} from './DriverAvatar';
import {DriverId, useDriver} from './DriverProvider';

type ByLineProps = {
	id?: DriverId;
	variant?: 'code' | 'name' | 'full';
	avatarProps?: Omit<DriverAvatarProps, 'id'>
	flagProps?: Omit<FlagProps, 'nationality'>
}

const DriverSkeleton = ({id, variant = 'full', avatarProps = {}}: ByLineProps) => {
	switch (variant) {
		case 'code':
			return <Skeleton variant="text" width="3em"/>;
		case 'name':
			return <Skeleton variant="text"/>;
		
		case 'full':
			return (
				<Grid container spacing={1} alignItems="center" sx={{flexWrap: 'nowrap'}}>
					<Hidden smDown><Grid item><DriverAvatar id={id} {...avatarProps}/></Grid></Hidden>
					<Grid item><Typography><Skeleton/></Typography></Grid>
				</Grid>
			);
	}
};


export default function ByLine({id, variant = 'full', avatarProps = {}, flagProps = {size: 16}}: ByLineProps) {
	const driver = useDriver(id);
	
	if (!driver) {
		return <DriverSkeleton id={id} variant={variant} avatarProps={avatarProps} flagProps={flagProps}/>;
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
					<Hidden smDown><Grid item><DriverAvatar id={id} {...avatarProps}/></Grid></Hidden>
					<Grid item><Typography><Link to={`/driver/${driverId}`}>{name}</Link></Typography></Grid>
					<Hidden mdDown><Grid item><Typography><Flag nationality={nationality} {...flagProps}/></Typography></Grid></Hidden>
				</Grid>
			);
	}
	
	return null;
}