import {Avatar, SxProps, useTheme} from '@mui/material';
// @ts-ignore
import flag from 'emoji-flag';
import nationalities from 'i18n-nationality';
import {useMemo} from 'react';

nationalities.registerLocale(require('i18n-nationality/langs/en.json'));

export const useCountryFlag = (nationality: string | undefined) => {
	if (!nationality) {
		return null;
	}
	
	const code = nationalities.getAlpha2Code(nationality === 'Monegasque' ? 'Monacan' : nationality, 'en');
	
	return flag(code);
};

export type FlagProps = {
	nationality: string | undefined;
	size?: 'small' | 'medium' | 'large' | 'auto' | number
}

const useSize = (size: FlagProps['size']): SxProps => {
	const theme = useTheme();
	
	return useMemo(() => {
		switch (size) {
			case 'small':
				return {width: theme.spacing(4), height: theme.spacing(4), fontSize: theme.spacing(4)};
			
			case 'medium':
				return {width: theme.spacing(8), height: theme.spacing(8), fontSize: theme.spacing(4)};
			
			case 'large':
				return {width: theme.spacing(16), height: theme.spacing(16), fontSize: theme.spacing(4)};
			
			default:
				if (typeof size === 'number') {
					return {width: size, height: size, fontSize: size};
				}
		}
		
		return {width: '100%', height: '100%'};
	}, [size, theme]);
	
};

export default function Flag({nationality, size = 'small'}: FlagProps) {
	const sizeSx = useSize(size);
	const flag   = useCountryFlag(nationality);
	if (!nationality) {
		return null;
	}
	
	return (
		<Avatar
			component="span"
			variant="square"
			alt={nationality}
			sx={{
				...sizeSx,
				background: 'transparent'
			}}
		>
			{flag}
		</Avatar>
	);
}