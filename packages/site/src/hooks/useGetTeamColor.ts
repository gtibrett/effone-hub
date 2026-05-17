import {useCssTokens} from '@/lib/cssTokens';
import {useGetAccessibleColor} from '@/hooks';
import {AppTeamColor} from '@/gql/graphql';
import {useCallback} from 'react';

type ColorVariants = 'primaryHex' | 'secondaryHex';

export default function useGetTeamColor() {
	const getAccessibleColor = useGetAccessibleColor();
	const tokens             = useCssTokens();
	const fallbackColor      = tokens.primary;

	return useCallback((colors: Pick<AppTeamColor, 'primaryHex' | 'secondaryHex'> | null | undefined, variant: ColorVariants = 'primaryHex', accessible: boolean = true) => {
		const color = colors?.[variant] || fallbackColor;

		return !accessible ? color : getAccessibleColor(color);
	}, [fallbackColor, getAccessibleColor]);
}
