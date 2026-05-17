'use client';

import {ComponentProps, forwardRef} from 'react';
import {Button as ShadcnButton} from './shadcn/button';
import {cn} from '@/lib/utils';

const SIZE_MAP: Record<string, ComponentProps<typeof ShadcnButton>['size']> = {
	small:  'icon-sm',
	medium: 'icon',
	large:  'icon-lg',
	sm:     'icon-sm',
	md:     'icon',
	lg:     'icon-lg'
};

export type IconButtonProps = ComponentProps<'button'> & {
	size?: keyof typeof SIZE_MAP;
	edge?: 'start' | 'end' | false;
};

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
	{size = 'medium', edge, className, children, ...rest},
	ref
) {
	const s = SIZE_MAP[size as string] ?? 'icon';
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
