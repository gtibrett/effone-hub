import {useDarkMode} from '@effonehub/ui-components';
import {useTheme} from '@mui/material';
import {amber, blueGrey, deepPurple, green, red} from '@mui/material/colors';

type ResultsColor = {
	background: string;
	color: string;
}

export default function useResultsColors(): { [key: string]: ResultsColor } {
	const theme           = useTheme();
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
				             color: theme.palette.getContrastText(background)
			             }
		             }
	             ))
	             .reduce((cur, item) => ({...cur, ...item}), {});
}