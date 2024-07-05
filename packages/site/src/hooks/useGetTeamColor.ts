import {useFallbackColor} from '@/components/ui';
import {useGetAccessibleColor} from '@/hooks';
import {Team, TeamColor} from '@/gql/graphql';
import {useCallback} from 'react';

type ColorVariants = keyof Pick<TeamColor, 'primary' | 'secondary'>

export default function useGetTeamColor() {
	const getAccessibleColor = useGetAccessibleColor();
	const fallbackColor      = useFallbackColor();
	
	return useCallback((colors: Team['colors'], variant: ColorVariants = 'primary', accessible: boolean = true) => {
		const color = colors?.[variant] || fallbackColor;
		
		return !accessible ? color : getAccessibleColor(color);
	}, [fallbackColor, getAccessibleColor]);
}