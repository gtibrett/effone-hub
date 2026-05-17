import {useDarkMode} from '@/components/ui';
import {useGetAccessibleColor} from '@/hooks';
import {blueGrey} from '@/lib/muiColors';
import {useCallback} from 'react';

const blueGreys = new Map<number, string>();
Object.entries(blueGrey).forEach(([key, color]) => {
	const numberKey = Number(key);
	if (!Number.isNaN(numberKey)) {
		blueGreys.set(numberKey, color);
	}
});

export default function useGetAccessibleChartColors() {
	const darkMode           = useDarkMode();
	const getAccessibleColor = useGetAccessibleColor();

	// useCallback so consumers passing the returned fn to <ResponsiveBar
	// colors={...}/> etc. don't trigger a remount on every parent render.
	return useCallback((color: string, force: boolean = false) => {
		const a11yColor = getAccessibleColor(color, force);

		return darkMode
		       ? [a11yColor, ...(new Array(4)).fill(100).map((v, i) => blueGreys.get(2 * v * (i + 1)) || '')]
		       : [a11yColor, ...(new Array(4)).fill(100).map((v, i) => blueGreys.get(900 - (2 * v * (i + 1))) || '')];
	}, [darkMode, getAccessibleColor]);
}