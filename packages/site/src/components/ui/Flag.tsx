import {Avatar, type AvatarProps} from '@/components/ui';
import {countryCode} from 'emoji-flags';
import nationalities from 'i18n-nationality';

nationalities.registerLocale(require('i18n-nationality/langs/en.json'));

export const useCountryFlag = (nationality: string | undefined) => {
	if (!nationality) return null;
	const code = nationalities.getAlpha2Code(nationality === 'Monegasque' ? 'Monacan' : nationality, 'en');
	return code ? countryCode(code).emoji : null;
};

export type FlagProps = {
	nationality: string | undefined;
	size?:       AvatarProps['size'];
	className?:  string;
};

export default function Flag({nationality, size = 'sm', className}: FlagProps) {
	const flag = useCountryFlag(nationality);
	if (!flag) return null;

	return (
		<Avatar
			variant="rounded"
			size={size}
			alt={nationality}
			className={`bg-transparent ${className ?? ''}`}
		>
			{flag}
		</Avatar>
	);
}
