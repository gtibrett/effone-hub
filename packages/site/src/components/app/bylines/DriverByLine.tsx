import {Flag, FlagProps} from '@/components/ui';
import {useDriver} from '@/hooks/data';
import {DriverId} from '@/types';
import {Driver} from '@/gql/graphql';
import {Link} from '@gtibrett/mui-additions';
import {Grid, Hidden, Skeleton, Typography} from '@mui/material';
import {memo} from 'react';
import {DriverAvatar, DriverAvatarProps} from '../avatars';

type BaseByLineProps = {
	variant?: 'code' | 'code-link' | 'name' | 'full' | 'link';
	avatarProps?: Omit<DriverAvatarProps, 'driverId'>;
	flagProps?: Omit<FlagProps, 'nationality'>;
	noFlag?: undefined | true
}

type ByLinePropsById = BaseByLineProps & {
	id?: DriverId;
}

type ByLinePropsByDriver = BaseByLineProps & {
	driver?: Pick<Driver, 'driverId' | 'driverRef' | 'forename' | 'surname' | 'nationality' | 'code'>
}

const DriverSkeleton = ({variant = 'full', avatarProps = {}}: BaseByLineProps) => {
	switch (variant) {
		case 'code':
			return <Skeleton variant="text" width="3em"/>;
		case 'name':
		case 'link':
			return <Skeleton variant="text"/>;
		
		case 'full':
			return (
				<Grid container spacing={1} alignItems="center" sx={{flexWrap: 'nowrap'}}>
					<Hidden smDown><Grid item><DriverAvatar driverId={undefined} {...avatarProps}/></Grid></Hidden>
					<Grid item><Typography><Skeleton/></Typography></Grid>
				</Grid>
			);
	}
	
	return null;
};

const ById = ({id, ...props}: ByLinePropsById) => {
	const driver = useDriver(id);
	
	return <ByDriver driver={driver} {...props}/>;
};

const ByDriver = (props: ByLinePropsByDriver) => {
	const {driver, variant = 'full', noFlag, avatarProps = {}, flagProps = {size: 16}} = props;
	
	if (!driver) {
		return <DriverSkeleton variant={variant} avatarProps={avatarProps} flagProps={flagProps}/>;
	}
	
	const {driverId, driverRef, forename, surname, nationality, code} = driver;
	const name                                                        = `${forename} ${surname}`;
	
	switch (variant) {
		case 'code':
			return <>{code}</>;
		case 'code-link':
			return <Link sx={{fontWeight: 'bold'}} href={`/drivers/${driverRef}`}>{code}</Link>;
		case 'name':
			return <>{name}</>;
		case 'link':
			return <Link href={`/drivers/${driverRef}`}>{name}</Link>;
		
		case 'full':
			return (
				<Grid container spacing={1} alignItems="center" sx={{flexWrap: 'nowrap'}}>
					<Hidden smDown><Grid item><DriverAvatar driverId={driverId} {...avatarProps}/></Grid></Hidden>
					<Grid item><Typography><Link href={`/drivers/${driverRef}`}>{name}</Link></Typography></Grid>
					{!noFlag && nationality && <Hidden mdDown><Grid item><Typography><Flag nationality={nationality} {...flagProps}/></Typography></Grid></Hidden>}
				</Grid>
			);
	}
	
	return null;
};

export function isByDriver(props: ByLinePropsById | ByLinePropsByDriver): props is ByLinePropsByDriver {
	return typeof (props as ByLinePropsById).id === 'undefined';
}

function DriverByLine(props: ByLinePropsById | ByLinePropsByDriver) {
	return isByDriver(props) ? <ByDriver {...props}/> : <ById {...props}/>;
}

export default memo(DriverByLine);