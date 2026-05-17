'use client';

/**
 * Drop-in replacement for `@mui/material/Typography` matching the variants
 * + `component` override the rest of the codebase already passes.
 *
 * Mapping mirrors the old `useEffTheme` typography scale:
 *   h1 = 48px, h2 = 24px, h3 = 20px, h4 = 16px
 *
 * Doesn't try to replicate every MUI option — `gutterBottom`, `paragraph`,
 * `noWrap`, `align` cover the most common consumer needs. `sx` is dropped
 * (consumers using sx-heavy Typography were rewritten in M3/M11).
 */
import {ElementType, HTMLAttributes, ReactNode, forwardRef} from 'react';
import {cn} from '@/lib/utils';

export type TypographyVariant =
	| 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
	| 'subtitle1' | 'subtitle2'
	| 'body1' | 'body2'
	| 'caption' | 'overline' | 'button' | 'inherit';

const VARIANT_CLASS: Record<TypographyVariant, string> = {
	h1:        'text-5xl font-bold leading-tight',
	h2:        'text-2xl font-bold leading-tight',
	h3:        'text-xl font-semibold leading-snug',
	h4:        'text-base font-semibold leading-snug',
	h5:        'text-base font-semibold leading-snug',
	h6:        'text-sm font-semibold leading-snug',
	subtitle1: 'text-base font-medium',
	subtitle2: 'text-sm font-medium',
	body1:     'text-base',
	body2:     'text-sm',
	caption:   'text-xs',
	overline:  'text-xs uppercase tracking-wider',
	button:    'text-sm font-medium uppercase',
	inherit:   ''
};

const VARIANT_DEFAULT_TAG: Record<TypographyVariant, ElementType> = {
	h1:        'h1',
	h2:        'h2',
	h3:        'h3',
	h4:        'h4',
	h5:        'h5',
	h6:        'h6',
	subtitle1: 'p',
	subtitle2: 'p',
	body1:     'p',
	body2:     'p',
	caption:   'span',
	overline:  'span',
	button:    'span',
	inherit:   'span'
};

const ALIGN_CLASS = {
	left:    'text-left',
	center:  'text-center',
	right:   'text-right',
	justify: 'text-justify',
	inherit: ''
} as const;

export type TypographyProps = Omit<HTMLAttributes<HTMLElement>, 'color'> & {
	variant?:      TypographyVariant;
	component?:    ElementType;
	color?:        'inherit' | 'primary' | 'secondary' | 'textPrimary' | 'textSecondary' | 'error' | (string & {});
	align?:        keyof typeof ALIGN_CLASS;
	gutterBottom?: boolean;
	paragraph?:    boolean;
	noWrap?:       boolean;
	// Legacy MUI sx/fontWeight props — accepted for compat. fontWeight applies
	// inline; sx is ignored. Drop in a follow-up sweep that converts each
	// callsite to className.
	sx?:           unknown;
	fontWeight?:   string | number;
	fontSize?:     string | number;
	children?:     ReactNode;
};

const COLOR_CLASS: Record<string, string> = {
	inherit:           '',
	primary:           'text-primary',
	secondary:         'text-secondary',
	textPrimary:       'text-foreground',
	textSecondary:     'text-muted-foreground',
	'text.primary':    'text-foreground',
	'text.secondary':  'text-muted-foreground',
	error:             'text-destructive'
};

const Typography = forwardRef<HTMLElement, TypographyProps>(function Typography(
	{
		variant = 'body1',
		component,
		color = 'inherit',
		align = 'inherit',
		gutterBottom,
		paragraph,
		noWrap,
		sx: _sx,
		fontWeight,
		fontSize,
		style,
		className,
		children,
		...rest
	},
	ref
) {
	const Tag = (component ?? VARIANT_DEFAULT_TAG[variant]) as ElementType;
	const cls = cn(
		VARIANT_CLASS[variant],
		COLOR_CLASS[color as string] ?? '',
		ALIGN_CLASS[align],
		gutterBottom && 'mb-2',
		paragraph && 'mb-4',
		noWrap && 'overflow-hidden text-ellipsis whitespace-nowrap',
		className
	);
	const mergedStyle = (fontWeight !== undefined || fontSize !== undefined)
		? {fontWeight, fontSize, ...style}
		: style;
	return (
		<Tag ref={ref as never} className={cls} style={mergedStyle} {...rest}>
			{children}
		</Tag>
	);
});

export default Typography;
