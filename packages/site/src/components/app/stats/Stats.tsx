import { PropsWithChildren } from 'react';
import { Grid } from '@mui/material';

export default function Stats({ children }: PropsWithChildren) {
	return (
		<Grid container spacing={2} className="justify-stretch flex-wrap lg:flex-nowrap py-0">
			{children}
		</Grid>
	);
}
