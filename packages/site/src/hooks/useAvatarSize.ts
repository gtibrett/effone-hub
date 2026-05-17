import {CSSProperties} from 'react';

export type AvatarSizes = 'small' | 'medium' | 'large' | 'auto' | number;

export default function useAvatarSize(size: AvatarSizes): CSSProperties {
	switch (size) {
		case 'small':
			return {width: 32, height: 32};
		case 'medium':
			return {width: 64, height: 64};
		case 'large':
			return {width: 128, height: 128};
		default:
			if (typeof size === 'number') {
				return {width: size, height: size};
			}
	}

	return {width: '100%', height: '100%'};
}
