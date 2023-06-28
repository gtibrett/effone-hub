import {faUser} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Avatar, SxProps, useTheme} from '@mui/material';
import {DriverId, useDriver} from './DriverProvider';

export type DriverAvatarProps = {
	id?: DriverId;
	size?: 'small' | 'medium' | 'large' | 'auto' | number
}

const useSize = (size: DriverAvatarProps['size']): SxProps => {
	const theme = useTheme();
	
	switch (size) {
		case 'small':
			return {width: theme.spacing(4), height: theme.spacing(4)};
		
		case 'medium':
			return {width: theme.spacing(8), height: theme.spacing(8)};
		
		case 'large':
			return {width: theme.spacing(16), height: theme.spacing(16)};
		
		default:
			if (typeof size === 'number') {
				return {width: size, height: size};
			}
	}
	
	return {width: '100%', height: '100%'};
};

export default function DriverAvatar({id, size = 'small'}: DriverAvatarProps) {
	const sx     = useSize(size);
	const driver = useDriver(id);
	
	if (!driver) {
		return <Avatar variant="square" sx={sx}><FontAwesomeIcon icon={faUser}/></Avatar>;
	}
	
	const {familyName, givenName} = driver;
	
	if (driver.bio?.thumbnail?.source) {
		return <Avatar variant="square" alt="" src={driver.bio?.thumbnail?.source} sx={{...sx, objectPosition: 'top'}}/>;
	}
	
	return <Avatar variant="square" sx={sx}>{givenName?.[0]}{familyName?.[0]}</Avatar>;
}