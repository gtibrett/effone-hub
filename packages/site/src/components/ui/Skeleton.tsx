'use client';

/**
 * Drop-in replacement for `@mui/material/Skeleton` rendering the shadcn
 * Skeleton primitive. Maps the legacy variant + height/width props onto
 * Tailwind classes/inline style so existing consumers compile unchanged.
 */
import {Skeleton as ShadcnSkeleton} from '@/components/ui/shadcn/skeleton';
import {cn} from '@/lib/utils';
import type {CSSProperties} from 'react';

type SkeletonVariant = 'text' | 'rectangular' | 'circular' | 'rounded';

export type SkeletonProps = {
	variant?:   SkeletonVariant;
	width?:     number | string;
	height?:    number | string;
	className?: string;
	style?:     CSSProperties;
	sx?:        unknown; // legacy MUI sx — accepted but ignored
};

const VARIANT_CLASS: Record<SkeletonVariant, string> = {
	text:        'h-[1em] rounded',
	rectangular: 'rounded-none',
	circular:    'rounded-full',
	rounded:     'rounded-md'
};

export default function Skeleton({variant = 'text', width, height, className, style, sx: _sx}: SkeletonProps) {
	const inlineStyle: CSSProperties = {...style};
	if (width !== undefined) inlineStyle.width = typeof width === 'number' ? `${width}px` : width;
	if (height !== undefined) inlineStyle.height = typeof height === 'number' ? `${height}px` : height;

	return <ShadcnSkeleton className={cn(VARIANT_CLASS[variant], className)} style={inlineStyle}/>;
}
