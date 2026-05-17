'use client';

/**
 * Drop-in replacement for `@mui/material/Box`. Just a `<div>` that
 * accepts (and silently swallows) MUI's `sx` + `component` props so
 * callsites compile. Doesn't translate `sx` to anything — the few
 * remaining Box callers post-M11 either pass `sx={{}}` empty objects
 * or simple positional/spacing values that have already been moved
 * to className in the caller.
 *
 * If a follow-up sweep wants to delete Box entirely, replace each
 * `<Box>` with `<div>` and move any className/style across; the
 * codemod is mechanical.
 */
import {CSSProperties, ElementType, HTMLAttributes, ReactNode, forwardRef} from 'react';
import {cn} from '@/lib/utils';

export type BoxProps = Omit<HTMLAttributes<HTMLElement>, 'color'> & {
	component?: ElementType;
	sx?:        unknown;
	// Legacy MUI Box style props piped to inline style for the few callers
	// that pass them. Anything missing here should be moved to className.
	width?:     CSSProperties['width'];
	height?:    CSSProperties['height'];
	minWidth?:  CSSProperties['minWidth'];
	minHeight?: CSSProperties['minHeight'];
	maxWidth?:  CSSProperties['maxWidth'];
	maxHeight?: CSSProperties['maxHeight'];
	m?:  number | string;
	mt?: number | string;
	mb?: number | string;
	mr?: number | string;
	ml?: number | string;
	mx?: number | string;
	my?: number | string;
	p?:  number | string;
	pt?: number | string;
	pb?: number | string;
	pr?: number | string;
	pl?: number | string;
	px?: number | string;
	py?: number | string;
	children?:  ReactNode;
};

function spacingToStyle(value: number | string | undefined, prop: keyof CSSProperties): CSSProperties {
	if (value === undefined) return {};
	const v = typeof value === 'number' ? `${value * 8}px` : value;
	return {[prop]: v} as CSSProperties;
}

const Box = forwardRef<HTMLElement, BoxProps>(function Box(
	{
		component,
		sx: _sx,
		className,
		style,
		width, height, minWidth, minHeight, maxWidth, maxHeight,
		m, mt, mb, mr, ml, mx, my,
		p, pt, pb, pr, pl, px, py,
		children,
		...rest
	},
	ref
) {
	const Tag = (component ?? 'div') as ElementType;
	const boxStyle: CSSProperties = {
		...(width     !== undefined && {width}),
		...(height    !== undefined && {height}),
		...(minWidth  !== undefined && {minWidth}),
		...(minHeight !== undefined && {minHeight}),
		...(maxWidth  !== undefined && {maxWidth}),
		...(maxHeight !== undefined && {maxHeight}),
		...spacingToStyle(m,  'margin'),
		...spacingToStyle(mt, 'marginTop'),
		...spacingToStyle(mb, 'marginBottom'),
		...spacingToStyle(mr, 'marginRight'),
		...spacingToStyle(ml, 'marginLeft'),
		...(mx !== undefined && {marginLeft: typeof mx === 'number' ? `${mx * 8}px` : mx, marginRight: typeof mx === 'number' ? `${mx * 8}px` : mx}),
		...(my !== undefined && {marginTop:  typeof my === 'number' ? `${my * 8}px` : my, marginBottom: typeof my === 'number' ? `${my * 8}px` : my}),
		...spacingToStyle(p,  'padding'),
		...spacingToStyle(pt, 'paddingTop'),
		...spacingToStyle(pb, 'paddingBottom'),
		...spacingToStyle(pr, 'paddingRight'),
		...spacingToStyle(pl, 'paddingLeft'),
		...(px !== undefined && {paddingLeft: typeof px === 'number' ? `${px * 8}px` : px, paddingRight: typeof px === 'number' ? `${px * 8}px` : px}),
		...(py !== undefined && {paddingTop:  typeof py === 'number' ? `${py * 8}px` : py, paddingBottom: typeof py === 'number' ? `${py * 8}px` : py}),
		...style
	};
	return (
		<Tag ref={ref as never} className={cn(className)} style={boxStyle} {...rest}>
			{children}
		</Tag>
	);
});

export default Box;
