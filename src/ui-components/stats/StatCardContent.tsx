import {alpha, Badge, BadgeOrigin, Box, CardHeader, CardHeaderProps, Grid, Typography, useTheme} from '@mui/material';
import {ReactNode} from 'react';
import {StatCardBaseProps} from './StatCard';
import {DataWithValue, StatFormatter} from './types';

type StateCardContentProps<T extends DataWithValue> = Pick<CardHeaderProps, 'avatar'> & {
	size: StatCardBaseProps<T>['size'];
	label?: ReactNode;
	title: ReactNode;
	data: T;
	color?: string;
	format?: StatFormatter<T>;
	extra?: StatFormatter<T> | ReactNode;
}

export const StatCardStat = <T extends DataWithValue>({label, data, format}: Pick<StateCardContentProps<T>, 'label' | 'data' | 'format'>) => (
	<Grid container spacing={1} wrap="nowrap" alignItems="center" justifyContent="space-between">
		{label && <Grid item><Typography noWrap paragraph={false}>{label}</Typography></Grid>}
		<Grid item><Typography fontWeight="bold" noWrap paragraph={false}>{format ? format(data) : (typeof data.value !== 'undefined' ? data.value : '--')}</Typography></Grid>
	</Grid>
);

export default function StatCardContent<T extends DataWithValue>({size, avatar, title, label, data, color, format, extra}: StateCardContentProps<T>) {
	const theme = useTheme();
	
	switch (size) {
		case 'small':
			const badgeAlignment: BadgeOrigin = {
				vertical:   'bottom',
				horizontal: 'right'
			};
			
			const sx = {
				py: 0,
				pl: 0,
				
				'& > .MuiCardHeader-avatar': {
					borderRight: `${theme.spacing(.125)} solid ${theme.palette.background.default}`,
					
					'&  .MuiAvatar-root': {
						borderRadius: 0,
						marginTop:    -1,
						marginBottom: 1,
						
						'& > img': {
							marginTop: 1
						}
					}
				},
				
				'& .MuiBadge-badge': {
					bottom:         10,
					right:          '50%',
					width:          '100%',
					borderTop:      `1px solid ${theme.palette.background.default}`,
					background:     alpha(color || theme.palette.background.paper, .9),
					borderRadius:   0,
					justifyContent: 'center',
					
					'&, & *': {
						color: theme.palette.getContrastText(color || theme.palette.background.paper)
					}
				}
			};
			
			return (
				<CardHeader
					sx={sx}
					avatar={<Badge sx={sx} badgeContent={title} anchorOrigin={badgeAlignment}>{avatar}</Badge>}
					subheader={(
						<>
							<StatCardStat<T> label={label} data={data} format={format}/>
							{extra && <Box mt={0}>{(typeof extra === 'function' ? extra(data) : extra)}</Box>}
						</>
					)}
				/>
			);
		
		case 'regular':
		default:
			return (
				<CardHeader
					avatar={avatar}
					title={title}
					titleTypographyProps={{noWrap: true}}
					subheader={(
						<>
							<StatCardStat<T> label={label} data={data} format={format}/>
							{extra && <Box mt={.5}>{(typeof extra === 'function' ? extra(data) : extra)}</Box>}
						</>
					)}
				/>
			);
	}
}