import {ReactNode} from 'react';
import {alpha} from '@/lib/color';
import {useTheme} from '@/lib/theme';
import {CardHeader, Typography} from '@/components/ui';
import Grid from '@/components/ui/Grid';
import {StatCardBaseProps} from './StatCard';
import {DataWithValue, StatFormatter} from './types';

type StateCardContentProps<T extends DataWithValue> = {
	avatar?: ReactNode;
	size:    StatCardBaseProps<T>['size'];
	label?:  ReactNode;
	title:   ReactNode;
	data:    T;
	color?:  string;
	format?: StatFormatter<T>;
	extra?:  StatFormatter<T> | ReactNode;
}

export const StatCardStat = <T extends DataWithValue>({label, data, format}: Pick<StateCardContentProps<T>, 'label' | 'data' | 'format'>) => (
	<Grid container spacing={1} wrap="nowrap" alignItems="center" justifyContent="space-between">
		{label && <Grid item><Typography noWrap paragraph={false}>{label}</Typography></Grid>}
		<Grid item><Typography fontWeight="bold" noWrap paragraph={false}>{format ? format(data) : (typeof data.value !== 'undefined' ? data.value : '--')}</Typography></Grid>
	</Grid>
);

export default function StatCardContent<T extends DataWithValue>({size, avatar, title, label, data, color, format, extra}: StateCardContentProps<T>) {
	const theme = useTheme();

	if (size === 'small') {
		const badgeBg = alpha(color || theme.palette.background.paper, .9);
		const badgeFg = theme.palette.getContrastText(color || theme.palette.background.paper);
		const dividerColor = theme.palette.background.default;

		return (
			<CardHeader
				className="!py-0 !pl-0"
				avatar={
					<div
						className="relative"
						style={{borderRight: `1px solid ${dividerColor}`}}
					>
						{avatar}
						<div
							className="absolute left-0 right-0 bottom-2 flex justify-center text-xs px-1 leading-tight"
							style={{
								background: badgeBg,
								color:      badgeFg,
								borderTop:  `1px solid ${dividerColor}`
							}}
						>
							{title}
						</div>
					</div>
				}
				subheader={(
					<>
						<StatCardStat<T> label={label} data={data} format={format}/>
						{extra && <div>{(typeof extra === 'function' ? extra(data) : extra)}</div>}
					</>
				)}
			/>
		);
	}

	return (
		<CardHeader
			avatar={avatar}
			title={title}
			titleTypographyProps={{noWrap: true}}
			subheader={(
				<>
					<StatCardStat<T> label={label} data={data} format={format}/>
					{extra && <div className="mt-1">{(typeof extra === 'function' ? extra(data) : extra)}</div>}
				</>
			)}
		/>
	);
}
