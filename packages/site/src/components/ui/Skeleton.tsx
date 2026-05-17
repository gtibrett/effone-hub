'use client';

/**
 * Skeleton — shadcn primitive with variant-driven shape classes. No `sx`,
 * no width/height props. Consumers size via Tailwind className (`w-32 h-8`,
 * `h-[400px]`, etc.). Dynamic measurements wrap Skeleton in a div that
 * carries the computed `style` instead.
 */
import {HTMLAttributes, forwardRef} from 'react';
import {Skeleton as ShadcnSkeleton} from '@/components/ui/shadcn/skeleton';
import {cn} from '@/lib/utils';

const VARIANT: Record<string, string> = {
	text:        'h-[1em] rounded',
	rectangular: 'rounded-none',
	rounded:     'rounded-md',
	circular:    'rounded-full'
};

export type SkeletonProps = HTMLAttributes<HTMLDivElement> & {
	variant?: keyof typeof VARIANT;
};

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(function Skeleton(
	{variant = 'text', className, ...rest},
	ref
) {
	return (
		<ShadcnSkeleton
			ref={ref}
			className={cn(VARIANT[variant], className)}
			{...rest}
		/>
	);
});

export default Skeleton;
