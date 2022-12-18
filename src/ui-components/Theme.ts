import {createTheme} from '@mui/material';
import {red} from '@mui/material/colors';

const theme = createTheme({
	palette: {
		primary: red
	}
});

export const useTheme = () => {
	return theme;
};