import {useFallbackColor} from '@/components/ui';
import {useGetAccessibleColor} from '@/hooks';
import {AppTeamColor} from '@/gql/graphql';
import {useCallback} from 'react';

type ColorVariants = 'primaryHex' | 'secondaryHex';

export default function useGetTeamColor() {
	const getAccessibleColor = useGetAccessibleColor();
	const fallbackColor      = useFallbackColor();

	return useCallback((colors: Pick<AppTeamColor, 'primaryHex' | 'secondaryHex'> | null | undefined, variant: ColorVariants = 'primaryHex', accessible: boolean = true) => {
		const color = colors?.[variant] || fallbackColor;

		return !accessible ? color : getAccessibleColor(color);
	}, [fallbackColor, getAccessibleColor]);
}