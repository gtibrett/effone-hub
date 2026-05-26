import {Grid} from '@mui/material';
import {PropsWithChildren} from 'react';

export default function Stats({children}: PropsWithChildren) {
	return (
        <Grid
            container
            spacing={2}
            className="justify-stretch flex-wrap lg:flex-nowrap py-0">
            {children}
        </Grid>
    );
};