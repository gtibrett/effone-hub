'use client';

/**
 * Typography — semantic-HTML wrapper with a small variant→class map.
 * No `sx`, no `fontWeight`/`fontSize`/`color` props. Consumers wanting
 * non-default sizing/coloring pass `className`. Color tokens come from
 * Tailwind (`text-muted-foreground`, `text-secondary`, etc.).
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

export type TypographyProps = HTMLAttributes<HTMLElement> & {
	variant?:      TypographyVariant;
	component?:    ElementType;
	align?:        keyof typeof ALIGN_CLASS;
	gutterBottom?: boolean;
	paragraph?:    boolean;
	noWrap?:       boolean;
	children?:     ReactNode;
};

const Typography = forwardRef<HTMLElement, TypographyProps>(function Typography(
	{
		variant = 'body1',
		component,
		align = 'inherit',
		gutterBottom,
		paragraph,
		noWrap,
		className,
		children,
		...rest
	},
	ref
) {
	const Tag = (component ?? VARIANT_DEFAULT_TAG[variant]) as ElementType;
	return (
		<Tag
			ref={ref as never}
			className={cn(
				VARIANT_CLASS[variant],
				ALIGN_CLASS[align],
				gutterBottom && 'mb-2',
				paragraph && 'mb-4',
				noWrap && 'overflow-hidden text-ellipsis whitespace-nowrap',
				className
			)}
			{...rest}
		>
			{children}
		</Tag>
	);
});

export default Typography;
