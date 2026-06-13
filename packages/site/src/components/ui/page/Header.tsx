import { type ReactNode, type RefObject, Suspense } from 'react';
import { twMerge } from 'tailwind-merge';
import {
	Grid,
	type GridProps,
	Paper,
	type PaperProps,
	Skeleton,
	Typography,
	type TypographyProps
} from '@mui/material';

type Skeletons = {
	title?: ReactNode;
	subheader?: ReactNode;
	extra?: ReactNode;
	action?: ReactNode;
};

export type HeaderProps = {
	title: ReactNode;
	subheader?: ReactNode;
	extra?: ReactNode;
	action?: ReactNode;
	actionProps?: GridProps;

	headerRef?: ((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null;
	headerProps?: PaperProps;
	titleProps?: TypographyProps;
	subheaderProps?: TypographyProps;
	skeletons?: Skeletons;
};

const DefaultSkeletons: Skeletons = {
	title: <Skeleton variant="text" />,
	subheader: <Skeleton variant="text" />,
	extra: <Skeleton variant="text" />,
	action: <Skeleton variant="text" />
};

type HasSkeleton<T> = T & {
	skeleton: ReactNode;
};

const PageTitle = ({
	title,
	skeleton,
	titleProps = {}
}: HasSkeleton<Pick<HeaderProps, 'title' | 'titleProps'>>) => {
	const { sx, ...other } = titleProps;

	return typeof title === 'string' ? (
		<Typography variant="h2" className="my-1" sx={sx} {...other}>
			{title}
		</Typography>
	) : (
		<Suspense fallback={skeleton}>{title}</Suspense>
	);
};
const PageSubheader = ({
	subheader,
	skeleton,
	subheaderProps = {}
}: HasSkeleton<Pick<HeaderProps, 'subheader' | 'subheaderProps'>>) => {
	const { sx, ...other } = subheaderProps;

	return typeof subheader === 'string' ? (
		<Typography variant="subtitle1" component="h2" sx={sx} {...other}>
			{subheader}
		</Typography>
	) : (
		<Suspense fallback={skeleton}>{subheader}</Suspense>
	);
};

export const Header = (props: HeaderProps) => {
	const { title, titleProps } = props;
	const { subheader, subheaderProps } = props;
	const { action, actionProps = {} } = props;
	const { extra, headerProps = {}, headerRef } = props;
	const skeletons = { ...DefaultSkeletons, ...props.skeletons };
	const { sx, className: headerClassName, ...other } = headerProps;

	return (
		<Paper
			ref={headerRef}
			elevation={0}
			className={twMerge('p-4 h-full', headerClassName)}
			sx={sx}
			{...other}
		>
			<Grid container spacing={2} className="items-stretch">
				<Grid size="grow">
					<Grid container spacing={2}>
						<Grid size={12}>
							<PageTitle
								title={title}
								titleProps={titleProps}
								skeleton={skeletons.title}
							/>
						</Grid>
						{subheader && (
							<Grid size={12}>
								<PageSubheader
									subheader={subheader}
									subheaderProps={subheaderProps}
									skeleton={skeletons.subheader}
								/>
							</Grid>
						)}
						{extra && (
							<Grid size={12}>
								<Suspense fallback={skeletons.extra}>{extra}</Suspense>
							</Grid>
						)}
					</Grid>
				</Grid>
				{action && (
					<Grid {...actionProps}>
						<Suspense fallback={skeletons.action}>{action}</Suspense>
					</Grid>
				)}
			</Grid>
		</Paper>
	);
};
