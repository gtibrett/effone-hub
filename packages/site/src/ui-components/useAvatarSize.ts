import {SxProps, useTheme} from '@mui/material';

export type AvatarSizes = 'small' | 'medium' | 'large' | 'auto' | number;

export default function useAvatarSize(size: AvatarSizes): SxProps {
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
}