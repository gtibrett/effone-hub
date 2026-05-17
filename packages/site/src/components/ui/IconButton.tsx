'use client';

import {ComponentProps, forwardRef} from 'react';
import {Button as ShadcnButton} from './shadcn/button';
import {cn} from '@/lib/utils';

export type IconButtonProps = ComponentProps<'button'> & {
	size?:     'small' | 'medium' | 'large' | 'sm' | 'md' | 'lg';
	color?:    string;
	edge?:     'start' | 'end' | false;
	sx?:       unknown;
};

const SIZE_MAP: Record<string, ComponentProps<typeof ShadcnButton>['size']> = {
	small:  'icon-sm',
	medium: 'icon',
	large:  'icon-lg',
	sm:     'icon-sm',
	md:     'icon',
	lg:     'icon-lg'
};

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
	{size = 'medium', color: _color, edge, sx: _sx, className, children, ...rest},
	ref
) {
	const s = SIZE_MAP[size] ?? 'icon';
	return (
		<ShadcnButton
			ref={ref}
			variant="ghost"
			size={s}
			className={cn(edge === 'end' && '-mr-2', edge === 'start' && '-ml-2', className)}
			{...rest}
		>
			{children}
		</ShadcnButton>
	);
});

export default IconButton;
