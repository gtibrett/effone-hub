'use client';

/**
 * Drop-in replacement for the MUI v5/v6 *legacy* `Grid` (container/item).
 *
 * Why a wrapper instead of pure Tailwind: there are 14 files using `<Grid
 * container>` + `<Grid item xs={...}>` with breakpoint props. Rewriting
 * each callsite to `grid grid-cols-12` + per-breakpoint col-spans is M3
 * scope, not M12. We keep the API surface stable here and let a later
 * sweep flatten the wrappers once the rest of M12 lands.
 *
 * Renders to CSS-grid (not flexbox) so the 12-col model is exact —
 * matches MUI's behavior under the hood for the props this codebase
 * actually uses (xs/sm/md/lg/xl, spacing, alignItems, justifyContent).
 */
import {CSSProperties, HTMLAttributes, ReactNode, forwardRef} from 'react';
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

function spanClass(prefix: '' | 'sm' | 'md' | 'lg' | 'xl', size: GridSize | undefined): string {
	if (size === undefined || size === false) return '';
	if (size === true || size === 'auto') {
		// `<Grid item xs>` style — fill remaining. CSS grid `auto` does this.
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
	rowSpacing?:     number;
	columnSpacing?:  number;
	direction?:      'row' | 'row-reverse' | 'column' | 'column-reverse';
	wrap?:           'nowrap' | 'wrap' | 'wrap-reverse';
	flexWrap?:       'nowrap' | 'wrap' | 'wrap-reverse';
	alignItems?:     'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
	justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
	xs?:             GridSize;
	sm?:             GridSize;
	md?:             GridSize;
	lg?:             GridSize;
	xl?:             GridSize;
	zeroMinWidth?:   boolean;
	sx?:             unknown;
	children?:       ReactNode;
};

const Grid = forwardRef<HTMLDivElement, GridProps>(function Grid(
	{
		container,
		item,
		spacing,
		rowSpacing,
		columnSpacing,
		direction,
		wrap,
		flexWrap,
		alignItems,
		justifyContent,
		xs,
		sm,
		md,
		lg,
		xl,
		zeroMinWidth: _zmw,
		sx: _sx,
		className,
		style,
		children,
		...rest
	},
	ref
) {
	const isContainer = container;
	const isItem      = item || (!container && (xs !== undefined || sm !== undefined || md !== undefined || lg !== undefined || xl !== undefined));

	const effectiveWrap = flexWrap ?? wrap;
	const containerCls = isContainer ? cn(
		'grid grid-cols-12',
		direction === 'column' || direction === 'column-reverse' ? 'flex flex-col' : '',
		effectiveWrap === 'nowrap' ? 'flex-nowrap' : '',
		alignItems    ? ALIGN[alignItems]      ?? '' : '',
		justifyContent? JUSTIFY[justifyContent] ?? '' : ''
	) : '';

	const itemCls = isItem ? cn(
		spanClass('',   xs),
		spanClass('sm', sm),
		spanClass('md', md),
		spanClass('lg', lg),
		spanClass('xl', xl)
	) : '';

	const gridStyle: CSSProperties = {...style};
	if (isContainer && spacing !== undefined) {
		gridStyle.gap = `${spacing * 8}px`;
	}
	if (isContainer && rowSpacing !== undefined) {
		gridStyle.rowGap = `${rowSpacing * 8}px`;
	}
	if (isContainer && columnSpacing !== undefined) {
		gridStyle.columnGap = `${columnSpacing * 8}px`;
	}

	return (
		<div ref={ref} className={cn(containerCls, itemCls, className)} style={gridStyle} {...rest}>
			{children}
		</div>
	);
});

export default Grid;
