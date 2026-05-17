/**
 * Maps the legacy `AvatarSizes` scale onto Tailwind utility classes the
 * new shadcn-style Avatar accepts via `className`. Numeric sizes are still
 * supported and produce arbitrary `w-[Npx] h-[Npx]` utilities so callers
 * that need a custom diameter don't have to special-case.
 */
export type AvatarSizes = 'small' | 'medium' | 'large' | 'auto' | number;

export default function useAvatarSize(size: AvatarSizes): string {
	switch (size) {
		case 'small':
			return 'w-8 h-8';
		case 'medium':
			return 'w-16 h-16';
		case 'large':
			return 'w-32 h-32';
		default:
			if (typeof size === 'number') {
				return `w-[${size}px] h-[${size}px]`;
			}
	}

	return 'w-full h-full';
}
