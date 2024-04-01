import {useDarkMode} from '@effonehub/ui-components';
import {amber, blueGrey, deepPurple, green, red} from '@mui/material/colors';

export default function useStatColors() {
	const prefersDarkMode = useDarkMode();
	
	return {
		starts:    blueGrey[prefersDarkMode ? 500 : 700],
		inPoints:  amber[prefersDarkMode ? 200 : 700],
		podiums:   green[prefersDarkMode ? 200 : 600],
		wins:      deepPurple[prefersDarkMode ? 200 : 600],
		outPoints: blueGrey[prefersDarkMode ? 300 : 500],
		bottom10:  blueGrey[prefersDarkMode ? 100 : 300],
		dnfs:      red[prefersDarkMode ? 200 : 600]
	};
}