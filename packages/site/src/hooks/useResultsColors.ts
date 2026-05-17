import useDarkMode from '@/lib/useDarkMode';
import {getContrastText} from '@/lib/color';
import {amber, blueGrey, deepPurple, green, red} from '@/lib/muiColors';
import {useMemo} from 'react';

type ResultsColor = {
	background: string;
	color: string;
}

export default function useResultsColors(): { [key: string]: ResultsColor } {
	const prefersDarkMode = useDarkMode();

	// useMemo so the returned object is reference-stable — Nivo's bar/legend
	// theming uses it as a colors={({id}) => colors[k].background} accessor;
	// a fresh object per render forces a chart remount.
	return useMemo(() => {
		const backgrounds = {
			appearances: blueGrey[prefersDarkMode ? 500 : 700],
			wins:        deepPurple[prefersDarkMode ? 200 : 700],
			podiums:     green[prefersDarkMode ? 200 : 500],
			inPoints:    amber[prefersDarkMode ? 200 : 500],
			outPoints:   blueGrey[prefersDarkMode ? 300 : 500],
			outOfPoints: blueGrey[prefersDarkMode ? 100 : 200],
			DNFs:        red[prefersDarkMode ? 200 : 700]
		};

		return Object.entries(backgrounds)
		             .map(([key, background]) => (
			             {
				             [key]: {
					             background,
					             color: getContrastText(background)
				             }
			             }
		             ))
		             .reduce((cur, item) => ({...cur, ...item}), {});
	}, [prefersDarkMode]);
}
