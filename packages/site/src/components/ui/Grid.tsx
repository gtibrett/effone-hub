/**
 * 12-col CSS-grid wrapper modeled on the legacy MUI Grid v1 (container/item)
 * surface, but rendered with Tailwind classes only. No `sx`, no inline styles.
 *
 * `spacing` maps to a discrete `gap-N` Tailwind class so consumers don't see
 * arbitrary `[Npx]` syntax. Out-of-range values are clamped to the nearest
 * supported step.
 */
import {HTMLAttributes, ReactNode, forwardRef} from 'react';
import {cn} from '@/lib/utils';

type GridSize = boolean | 'auto' | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

const SPAN_XS: Record<number, string> = {
	1:  'col-span-1',  2:  'col-span-2',  3:  'col-span-3',  4:  'col-span-4',
	5:  'col-span-5',  6:  'col-span-6',  7:  'col-span-7',  8:  'col-span-8',
	9:  'col-span-9',  10: 'col-span-10', 11: 'col-span-11', 12: 'col-span-12'
};
const SPAN_SM: Record<number, string> = {
	1:  'sm:col-span-1',  2:  'sm:col-span-2',  3:  'sm:col-span-3',  4:  'sm:col-span-4',
	5:  'sm:col-span-5',  6:  'sm:col-span-6',  7:  'sm:col-span-7',  8:  'sm:col-span-8',
	9:  'sm:col-span-9',  10: 'sm:col-span-10', 11: 'sm:col-span-11', 12: 'sm:col-span-12'
};
const SPAN_MD: Record<number, string> = {
	1:  'md:col-span-1',  2:  'md:col-span-2',  3:  'md:col-span-3',  4:  'md:col-span-4',
	5:  'md:col-span-5',  6:  'md:col-span-6',  7:  'md:col-span-7',  8:  'md:col-span-8',
	9:  'md:col-span-9',  10: 'md:col-span-10', 11: 'md:col-span-11', 12: 'md:col-span-12'
};
const SPAN_LG: Record<number, string> = {
	1:  'lg:col-span-1',  2:  'lg:col-span-2',  3:  'lg:col-span-3',  4:  'lg:col-span-4',
	5:  'lg:col-span-5',  6:  'lg:col-span-6',  7:  'lg:col-span-7',  8:  'lg:col-span-8',
	9:  'lg:col-span-9',  10: 'lg:col-span-10', 11: 'lg:col-span-11', 12: 'lg:col-span-12'
};
const SPAN_XL: Record<number, string> = {
	1:  'xl:col-span-1',  2:  'xl:col-span-2',  3:  'xl:col-span-3',  4:  'xl:col-span-4',
	5:  'xl:col-span-5',  6:  'xl:col-span-6',  7:  'xl:col-span-7',  8:  'xl:col-span-8',
	9:  'xl:col-span-9',  10: 'xl:col-span-10', 11: 'xl:col-span-11', 12: 'xl:col-span-12'
};

const GAP: Record<number, string> = {
	0: 'gap-0', 1: 'gap-2', 2: 'gap-4', 3: 'gap-6', 4: 'gap-8',
	5: 'gap-10', 6: 'gap-12', 8: 'gap-16'
};

function spanClass(prefix: '' | 'sm' | 'md' | 'lg' | 'xl', size: GridSize | undefined): string {
	if (size === undefined || size === false) return '';
	if (size === true || size === 'auto') {
		return prefix === '' ? 'flex-1' : '';
	}
	const map = prefix === '' ? SPAN_XS
		: prefix === 'sm' ? SPAN_SM
		: prefix === 'md' ? SPAN_MD
		: prefix === 'lg' ? SPAN_LG
		: SPAN_XL;
	return map[size] ?? '';
}

const ALIGN: Record<string, string> = {
	'flex-start':    'items-start',
	'center':        'items-center',
	'flex-end':      'items-end',
	'stretch':       'items-stretch',
	'baseline':      'items-baseline'
};
const JUSTIFY: Record<string, string> = {
	'flex-start':    'justify-start',
	'center':        'justify-center',
	'flex-end':      'justify-end',
	'space-between': 'justify-between',
	'space-around':  'justify-around',
	'space-evenly':  'justify-evenly'
};

export type GridProps = HTMLAttributes<HTMLDivElement> & {
	container?:      boolean;
	item?:           boolean;
	spacing?:        number;
	direction?:      'row' | 'row-reverse' | 'column' | 'column-reverse';
	wrap?:           'nowrap' | 'wrap' | 'wrap-reverse';
	alignItems?:     keyof typeof ALIGN;
	justifyContent?: keyof typeof JUSTIFY;
	xs?:             GridSize;
	sm?:             GridSize;
	md?:             GridSize;
	lg?:             GridSize;
	xl?:             GridSize;
	children?:       ReactNode;
};

const Grid = forwardRef<HTMLDivElement, GridProps>(function Grid(
	{
		container,
		item,
		spacing,
		direction,
		wrap,
		alignItems,
		justifyContent,
		xs, sm, md, lg, xl,
		className,
		children,
		...rest
	},
	ref
) {
	const isContainer = container;
	const isItem      = item || (!container && (xs !== undefined || sm !== undefined || md !== undefined || lg !== undefined || xl !== undefined));

	const containerCls = isContainer ? cn(
		'grid grid-cols-12',
		direction === 'column' || direction === 'column-reverse' ? 'flex flex-col' : '',
		wrap === 'nowrap' ? 'flex-nowrap' : '',
		alignItems     ? ALIGN[alignItems]      ?? '' : '',
		justifyContent ? JUSTIFY[justifyContent] ?? '' : '',
		spacing !== undefined ? GAP[spacing] ?? 'gap-4' : ''
	) : '';

	const itemCls = isItem ? cn(
		spanClass('',   xs),
		spanClass('sm', sm),
		spanClass('md', md),
		spanClass('lg', lg),
		spanClass('xl', xl)
	) : '';

	return (
		<div ref={ref} className={cn(containerCls, itemCls, className)} {...rest}>
			{children}
		</div>
	);
});

export default Grid;
