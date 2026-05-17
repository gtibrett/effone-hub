'use client';

/**
 * Button — passthrough to shadcn's button with MUI's variant/size aliases
 * mapped onto shadcn's variants. No `sx`, no color overrides through props.
 * Brand color tweaks must be done via `className`.
 */
import {ComponentProps, forwardRef} from 'react';
import {Button as ShadcnButton} from './shadcn/button';
import {cn} from '@/lib/utils';

type MUIVariant = 'text' | 'outlined' | 'contained';
type MUISize    = 'small' | 'medium' | 'large';

const VARIANT_MAP: Record<MUIVariant, ComponentProps<typeof ShadcnButton>['variant']> = {
	text:      'ghost',
	outlined:  'outline',
	contained: 'default'
};
const SIZE_MAP: Record<MUISize, ComponentProps<typeof ShadcnButton>['size']> = {
	small:  'sm',
	medium: 'default',
	large:  'lg'
};

export type ButtonProps = Omit<ComponentProps<'button'>, 'color'> & {
	variant?:   MUIVariant | ComponentProps<typeof ShadcnButton>['variant'];
	size?:      MUISize    | ComponentProps<typeof ShadcnButton>['size'];
	fullWidth?: boolean;
	startIcon?: React.ReactNode;
	endIcon?:   React.ReactNode;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
	{variant = 'contained', size = 'medium', fullWidth, startIcon, endIcon, className, children, ...rest},
	ref
) {
	const v = (VARIANT_MAP as Record<string, ComponentProps<typeof ShadcnButton>['variant']>)[variant as string] ?? (variant as ComponentProps<typeof ShadcnButton>['variant']);
	const s = (SIZE_MAP    as Record<string, ComponentProps<typeof ShadcnButton>['size']   >)[size    as string] ?? (size    as ComponentProps<typeof ShadcnButton>['size']);
	return (
		<ShadcnButton
			ref={ref}
			variant={v}
			size={s}
			className={cn(fullWidth && 'w-full', className)}
			{...rest}
		>
			{startIcon}
			{children}
			{endIcon}
		</ShadcnButton>
	);
});

export default Button;
