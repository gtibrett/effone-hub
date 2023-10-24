import {Link} from '@gtibrett/mui-additions';
import {Grid, Hidden, Skeleton, Typography} from '@mui/material';
import Flag, {FlagProps} from '../Flag';
import {DriverAvatar, DriverAvatarProps, DriverId, useDriver} from './index';

type ByLineProps = {
	id?: DriverId;
	variant?: 'code' | 'name' | 'full' | 'link';
	avatarProps?: Omit<DriverAvatarProps, 'driverId'>
	flagProps?: Omit<FlagProps, 'nationality'>
}

const DriverSkeleton = ({id, variant = 'full', avatarProps = {}}: ByLineProps) => {
	switch (variant) {
		case 'code':
			return <Skeleton variant="text" width="3em"/>;
		case 'name':
		case 'link':
			return <Skeleton variant="text"/>;
		
		case 'full':
			return (
				<Grid container spacing={1} alignItems="center" sx={{flexWrap: 'nowrap'}}>
					<Hidden smDown><Grid item><DriverAvatar driverId={id} {...avatarProps}/></Grid></Hidden>
					<Grid item><Typography><Skeleton/></Typography></Grid>
				</Grid>
			);
	}
};


export default function DriverByLine({id, variant = 'full', avatarProps = {}, flagProps = {size: 16}}: ByLineProps) {
	const driver = useDriver(id);
	
	if (!driver) {
		return <DriverSkeleton id={id} variant={variant} avatarProps={avatarProps} flagProps={flagProps}/>;
	}
	
	const {driverRef, forename, surname, nationality, code} = driver;
	const name                                              = `${forename} ${surname}`;
	
	switch (variant) {
		case 'code':
			return <>{code}</>;
		case 'name':
			return <>{name}</>;
		
		case 'link':
			return <Typography><Link to={`/driver/${driverRef}`}>{name}</Link></Typography>;
		
		case 'full':
			return (
				<Grid container spacing={1} alignItems="center" sx={{flexWrap: 'nowrap'}}>
					<Hidden smDown><Grid item><DriverAvatar driverId={id} {...avatarProps}/></Grid></Hidden>
					<Grid item><Typography><Link to={`/driver/${driverRef}`}>{name}</Link></Typography></Grid>
					<Hidden mdDown><Grid item><Typography><Flag nationality={nationality} {...flagProps}/></Typography></Grid></Hidden>
				</Grid>
			);
	}
	
	return null;
}