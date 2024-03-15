import {Grid, GridProps, Paper, PaperProps, Typography, TypographyProps} from '@mui/material';
import {PropsWithChildren, ReactNode, RefObject} from 'react';

type PageProps = PropsWithChildren<{
	title: ReactNode;
	subheader?: ReactNode;
	extra?: ReactNode;
	action?: ReactNode;
	actionProps?: GridProps;
	
	headerRef?: ((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null;
	headerProps?: PaperProps
	titleProps?: TypographyProps;
	subheaderProps?: TypographyProps;
}>

const PageTitle     = ({title, titleProps = {}}: Pick<PageProps, 'title' | 'titleProps'>) => {
	const {sx = {}, ...other} = titleProps;
	
	return typeof title === 'string' ? <Typography variant="h2" sx={{my: .5, ...sx}} {...other}>{title}</Typography> : title;
};
const PageSubheader = ({subheader, subheaderProps = {}}: Pick<PageProps, 'subheader' | 'subheaderProps'>) => {
	const {sx = {}, ...other} = subheaderProps;
	
	return typeof subheader === 'string' ? <Typography variant="subtitle1" component="h2" sx={sx} {...other}>{subheader}</Typography> : subheader;
};

export default function Page(props: PageProps) {
	const {title, titleProps}                            = props;
	const {subheader, subheaderProps}                    = props;
	const {action, actionProps = {}}                     = props;
	const {extra, headerProps = {}, headerRef, children} = props;
	const {sx = {}, ...other}                            = headerProps;
	
	return (
		<Grid container spacing={2} alignItems="stretch">
			<Grid item xs={12}>
				<Paper ref={headerRef} elevation={0} sx={{p: 2, height: '100%', ...sx}} {...other}>
					<Grid container spacing={2} alignItems="stretch">
						<Grid item xs>
							<Grid container spacing={2}>
								<Grid item xs={12}><PageTitle title={title} titleProps={titleProps}/></Grid>
								{subheader && <Grid item xs={12}><PageSubheader subheader={subheader} subheaderProps={subheaderProps}/></Grid>}
								{extra && <Grid item xs={12}>{extra}</Grid>}
							</Grid>
						</Grid>
						{action && <Grid item {...actionProps}>{action}</Grid>}
					</Grid>
				</Paper>
			</Grid>
			
			{children && <Grid item xs={12}>{children}</Grid>}
		</Grid>
	);
}