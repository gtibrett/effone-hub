import {Avatar} from '@mui/material';
// @ts-ignore
import flag from 'emoji-flag';
import nationalities from 'i18n-nationality';

nationalities.registerLocale(require('i18n-nationality/langs/en.json'));

export const useCountryFlag = (nationality: string | undefined) => {
	if (!nationality) {
		return null;
	}
	
	const code = nationalities.getAlpha2Code(nationality, 'en');
	
	return flag(code);
};

export default function Flag({nationality}: { nationality: string | undefined }) {
	const flag = useCountryFlag(nationality);
	if (!nationality) {
		return null;
	}
	
	return (
		<Avatar
			variant="square"
			alt={nationality}
			sx={{
				width: 16,
				height: 16,
				background: 'transparent'
			}}
		>
			{flag}
		</Avatar>
	);
}