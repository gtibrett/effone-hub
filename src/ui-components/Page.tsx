import {Grid, Paper, Typography} from '@mui/material';
import {PropsWithChildren, ReactNode} from 'react';

type PageProps = PropsWithChildren<{
	title: ReactNode;
	subheader?: ReactNode;
	action?: ReactNode;
}>

export default function Page({title, subheader, action, children}: PageProps) {
	return (
		<>
			<Grid container spacing={2} alignItems="center">
				<Grid item xs>
					<Paper sx={{p: 2}} elevation={0}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								{typeof title === 'string' ? <Typography variant="h2" sx={{my: 1}}>{title}</Typography> : title}
							</Grid>
							{
								subheader && (
									          <Grid item xs={12}>
										          {typeof title === 'string' ? <Typography variant="subtitle1" component="h2" sx={{mt: -2}}>{subheader}</Typography> : subheader}
									          </Grid>
								          )
							}
						</Grid>
					</Paper>
				</Grid>
				{action && <Grid item>{action}</Grid>}
				{
					children && (
						         <Grid item xs={12}>
							         {children}
						         </Grid>
					         )
				}
			</Grid>
		</>
	);
}