import {Grid} from '@mui/material';
import {PropsWithChildren} from 'react';

export default function Stats({children}: PropsWithChildren) {
	return (
        <Grid
            container
            spacing={2}
            sx={{
                justifyContent: "stretch",
                flexWrap: {xs: 'wrap', lg: 'nowrap'},
                py: 0
            }}>
            {children}
        </Grid>
    );
};