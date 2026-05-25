import {useDarkMode} from '@/components/ui';
import {getContrastText} from '@/lib/useContrastText';
import {amber, deepPurple, green, red} from '@mui/material/colors';
import {blueGrey} from '@/components/ui/colors';

type ResultsColor = {
	background: string;
	color: string;
}

/**
 * Stats-card color map. Returns concrete strings so consumers can spread
 * them into either an sx prop OR a JS color sink (Nivo `colors`, SVG
 * `color` attr). For sx callers that want the CSS-only `contrast-color()`
 * upgrade, layer `useContrastText` on top per-element.
 */
export default function useResultsColors(): { [key: string]: ResultsColor } {
	const prefersDarkMode = useDarkMode();

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
}