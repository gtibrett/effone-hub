import {ReactNode} from 'react';
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

export default function StatCardContent<T extends DataWithValue>({size, avatar, label, title, data, color, format, extra}: StateCardContentProps<T>) {
	if (size === 'small') {
		const value = format ? format(data) : (typeof data.value !== 'undefined' ? data.value : '--');

		return (
			<div className="flex items-center gap-3 h-full px-3 py-2">
				<div
					className="w-12 h-12 shrink-0 flex items-center justify-center overflow-hidden rounded"
					style={color ? {borderLeft: `4px solid ${color}`} : undefined}
				>
					{avatar}
				</div>
				<div className="flex-1 min-w-0 flex flex-col justify-center">
					<span className="text-xs text-muted-foreground truncate leading-tight">{label ?? title}</span>
					<span className="text-base font-bold truncate leading-tight">{value}</span>
					{extra && <span className="text-xs truncate leading-tight">{typeof extra === 'function' ? extra(data) : extra}</span>}
				</div>
			</div>
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
