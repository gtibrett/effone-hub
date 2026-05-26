/**
 * Returns the requested team-color variant from a team's color block, or
 * a CSS var fallback if the team has no color set. No accessibility
 * shifting — for contrast against a known bg, use `contrast-color()` in
 * CSS at the call site.
 */
import {AppTeamColor} from '@/gql/graphql';
import {useCallback} from 'react';

type ColorVariants = 'primaryHex' | 'secondaryHex';

const FALLBACK_COLOR = 'var(--color-primary)';

export default function useGetTeamColor() {
	return useCallback(
		(colors: Pick<AppTeamColor, 'primaryHex' | 'secondaryHex'> | null | undefined, variant: ColorVariants = 'primaryHex') => {
			return colors?.[variant] || FALLBACK_COLOR;
		},
		[]
	);
}
