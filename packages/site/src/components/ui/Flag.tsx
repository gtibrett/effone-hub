import { CSSProperties } from 'react';
import { countryCode } from 'emoji-flags';
import nationalities from 'i18n-nationality';
import { Avatar } from '@mui/material';

nationalities.registerLocale(require('i18n-nationality/langs/en.json'));

export const useCountryFlag = (code: string | null | undefined) => {
	return code ? countryCode(code).emoji : null;
};

export type FlagProps = {
	nationality?: { alpha2Code?: string | null; name?: string | null } | null;
	size?: 'small' | 'medium' | 'large' | 'auto' | number;
};

const getSizeStyle = (size: FlagProps['size']): CSSProperties => {
	switch (size) {
		case 'small':
			return { width: 32, height: 32, fontSize: 32 };

		case 'medium':
			return { width: 64, height: 64, fontSize: 32 };

		case 'large':
			return { width: 128, height: 128, fontSize: 32 };

		default:
			if (typeof size === 'number') {
				return { width: size, height: size, fontSize: size };
			}
	}

	return { width: '100%', height: '100%' };
};

export default function Flag({ nationality, size = 'small' }: FlagProps) {
	const sizeStyle = getSizeStyle(size);
	const flag = useCountryFlag(nationality?.alpha2Code);
	if (!flag) {
		return null;
	}

	return (
		<Avatar
			component="span"
			variant="rounded"
			alt={nationality?.name ?? undefined}
			className="bg-transparent"
			style={sizeStyle}
		>
			{flag}
		</Avatar>
	);
}
