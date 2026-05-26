import type {CSSProperties} from 'react';

export type AvatarSizes = 'small' | 'medium' | 'large' | 'auto' | number;

export type AvatarSizeStyle = {
	className: string;
	style?: CSSProperties;
};

// Static classes so Tailwind scanner picks them up; numeric sizes use inline style.
const PRESETS: Record<Exclude<AvatarSizes, number>, AvatarSizeStyle> = {
	small:  {className: 'w-8 h-8'},
	medium: {className: 'w-16 h-16'},
	large:  {className: 'w-32 h-32'},
	auto:   {className: 'w-full h-full'}
};

export default function useAvatarSize(size: AvatarSizes): AvatarSizeStyle {
	if (typeof size === 'number') {
		return {className: '', style: {width: size, height: size}};
	}
	return PRESETS[size] ?? PRESETS.auto;
}
