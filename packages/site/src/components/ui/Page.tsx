import {Grid, GridProps, Paper, PaperProps, Skeleton, Typography, TypographyProps} from '@mui/material';
import {PropsWithChildren, ReactNode, RefObject, Suspense} from 'react';

type Skeletons = {
	title?: ReactNode;
	subheader?: ReactNode;
	extra?: ReactNode;
	action?: ReactNode;
}

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
	skeletons?: Skeletons;
}>

const DefaultSkeletons: Skeletons = {
	title:     <Skeleton variant="text"/>,
	subheader: <Skeleton variant="text"/>,
	extra:     <Skeleton variant="text"/>,
	action:    <Skeleton variant="text"/>
};

type HasSkeleton<T> = T & {
	skeleton: ReactNode
}

const PageTitle     = ({title, skeleton, titleProps = {}}: HasSkeleton<Pick<PageProps, 'title' | 'titleProps'>>) => {
	const {sx = {}, ...other} = titleProps;
	
	return typeof title === 'string' ? <Typography variant="h2" sx={{my: .5, ...sx}} {...other}>{title}</Typography> : <Suspense fallback={skeleton}>{title}</Suspense>;
};
const PageSubheader = ({subheader, skeleton, subheaderProps = {}}: HasSkeleton<Pick<PageProps, 'subheader' | 'subheaderProps'>>) => {
	const {sx = {}, ...other} = subheaderProps;
	
	return typeof subheader === 'string' ? <Typography variant="subtitle1" component="h2" sx={sx} {...other}>{subheader}</Typography> : <Suspense fallback={skeleton}>{subheader}</Suspense>;
};

export default function Page(props: PageProps) {
	const {title, titleProps}                            = props;
	const {subheader, subheaderProps}                    = props;
	const {action, actionProps = {}}                     = props;
	const {extra, headerProps = {}, headerRef, children} = props;
	const skeletons                                      = {...DefaultSkeletons, ...props.skeletons};
	const {sx = {}, ...other}                            = headerProps;
	
	return (
		<Grid container spacing={2} alignItems="stretch">
			<Grid item xs={12}>
				<Paper ref={headerRef} elevation={0} sx={{p: 2, height: '100%', ...sx}} {...other}>
					<Grid container spacing={2} alignItems="stretch">
						<Grid item xs>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<PageTitle title={title} titleProps={titleProps} skeleton={skeletons.title}/>
								</Grid>
								{subheader && (
									<Grid item xs={12}>
										<PageSubheader subheader={subheader} subheaderProps={subheaderProps} skeleton={skeletons.subheader}/>
									</Grid>
								)}
								{extra && (
									<Grid item xs={12}>
										<Suspense fallback={skeletons.extra}>
											{extra}
										</Suspense>
									</Grid>
								)}
							</Grid>
						</Grid>
						{action && <Grid item {...actionProps}><Suspense fallback={skeletons.action}>{action}</Suspense></Grid>}
					</Grid>
				</Paper>
			</Grid>
			{children && <Grid item xs={12}>{children}</Grid>}
		</Grid>
	);
}