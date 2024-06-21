import {Grid} from '@mui/material';
import {PropsWithChildren} from 'react';

export default function Stats({children}: PropsWithChildren) {
	return (
		<Grid container spacing={2} sx={{py: 0}} justifyContent="stretch" flexWrap={{xs: 'wrap', lg: 'nowrap'}}>
			{children}
		</Grid>
	);
};