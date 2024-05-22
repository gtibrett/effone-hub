import {useGetAccessibleColor} from '@effonehub/ui-components';
import {useFallbackColor} from '@effonehub/ui-components/Theme';
import {Team} from '@gtibrett/effone-hub-graph-api';
import {TeamColor} from '@gtibrett/effone-hub-graph-api/types/graph';
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