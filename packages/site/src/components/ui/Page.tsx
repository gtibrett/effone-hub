import {Skeleton, Typography, type TypographyProps} from '@/components/ui';

import {Grid, Paper} from '@/components/ui';
import type {GridProps, PaperProps} from '@/components/ui';
import {PropsWithChildren, ReactNode, RefObject, Suspense} from 'react';
import {cn} from '@/lib/utils';

type Skeletons = {
	title?:     ReactNode;
	subheader?: ReactNode;
	extra?:     ReactNode;
	action?:    ReactNode;
}

type PageProps = PropsWithChildren<{
	title:           ReactNode;
	subheader?:      ReactNode;
	extra?:          ReactNode;
	action?:         ReactNode;
	actionProps?:    GridProps;

	headerRef?:      ((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null;
	headerProps?:    PaperProps;
	titleProps?:     TypographyProps;
	subheaderProps?: TypographyProps;
	skeletons?:      Skeletons;
}>

const DefaultSkeletons: Skeletons = {
	title:     <Skeleton variant="text"/>,
	subheader: <Skeleton variant="text"/>,
	extra:     <Skeleton variant="text"/>,
	action:    <Skeleton variant="text"/>
};

type HasSkeleton<T> = T & {skeleton: ReactNode}

const PageTitle = ({title, skeleton, titleProps = {}}: HasSkeleton<Pick<PageProps, 'title' | 'titleProps'>>) =>
	typeof title === 'string'
		? <Typography variant="h2" className="my-1" {...titleProps}>{title}</Typography>
		: <Suspense fallback={skeleton}>{title}</Suspense>;

const PageSubheader = ({subheader, skeleton, subheaderProps = {}}: HasSkeleton<Pick<PageProps, 'subheader' | 'subheaderProps'>>) =>
	typeof subheader === 'string'
		? <Typography variant="subtitle1" component="h2" {...subheaderProps}>{subheader}</Typography>
		: <Suspense fallback={skeleton}>{subheader}</Suspense>;

export default function Page(props: PageProps) {
	const {title, titleProps}                            = props;
	const {subheader, subheaderProps}                    = props;
	const {action, actionProps = {}}                     = props;
	const {extra, headerProps = {}, headerRef, children} = props;
	const skeletons                                      = {...DefaultSkeletons, ...props.skeletons};
	const {className: headerClassName, ...headerRest}    = headerProps;

	return (
		<Grid container spacing={2} alignItems="stretch">
			<Grid item xs={12}>
				<Paper
					ref={headerRef}
					className={cn('p-4 h-full bg-primary text-primary-foreground relative overflow-hidden', headerClassName)}
					{...headerRest}
				>
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
										<Suspense fallback={skeletons.extra}>{extra}</Suspense>
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
