import {CSSProperties} from 'react';
import {Avatar} from '@/components/ui';
import {countryCode} from 'emoji-flags';
import nationalities from 'i18n-nationality';

nationalities.registerLocale(require('i18n-nationality/langs/en.json'));

export const useCountryFlag = (nationality: string | undefined) => {
	if (!nationality) {
		return null;
	}

	const code = nationalities.getAlpha2Code(nationality === 'Monegasque' ? 'Monacan' : nationality, 'en');

	return code ? countryCode(code).emoji : null;
};

export type FlagProps = {
	nationality: string | undefined;
	size?: 'small' | 'medium' | 'large' | 'auto' | number
}

const useSize = (size: FlagProps['size']): CSSProperties => {
	switch (size) {
		case 'small':
			return {width: 32, height: 32, fontSize: 32};
		case 'medium':
			return {width: 64, height: 64, fontSize: 32};
		case 'large':
			return {width: 128, height: 128, fontSize: 32};
		default:
			if (typeof size === 'number') {
				return {width: size, height: size, fontSize: size};
			}
	}

	return {width: '100%', height: '100%'};
};

export default function Flag({nationality, size = 'small'}: FlagProps) {
	const sizeSx = useSize(size);
	const flag   = useCountryFlag(nationality);
	if (!flag) {
		return null;
	}

	return (
		<Avatar
			variant="rounded"
			alt={nationality}
			style={{
				...sizeSx,
				background: 'transparent'
			}}
		>
			{flag}
		</Avatar>
	);
}
