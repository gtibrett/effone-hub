/**
 * Returns team-color variant or CSS-var fallback. No a11y shifting —
 * for contrast against known bg, use `contrast-color()` at the call site.
 */

import { useCallback } from 'react';

import type { AppTeamColor } from '@/gql/graphql';

type ColorVariants = 'primaryHex' | 'secondaryHex';

const FALLBACK_COLOR = 'var(--color-primary)';

export default function useGetTeamColor() {
	return useCallback(
		(
			colors: Pick<AppTeamColor, 'primaryHex' | 'secondaryHex'> | null | undefined,
			variant: ColorVariants = 'primaryHex'
		) => {
			return colors?.[variant] || FALLBACK_COLOR;
		},
		[]
	);
}
