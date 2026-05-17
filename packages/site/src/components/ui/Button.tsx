'use client';

/**
 * Drop-in wrapper for `@mui/material/Button` that proxies to the shadcn
 * Button, mapping MUI's `variant` (outlined/contained/text) and `size`
 * (small/medium/large) + `color` props onto shadcn variants. The few
 * remaining `<Button>` callsites pass these props; this avoids breaking
 * them while M12 finishes pulling MUI out.
 */
import {ComponentProps, forwardRef} from 'react';
import {Button as ShadcnButton} from './shadcn/button';

type MUIVariant = 'text' | 'outlined' | 'contained';
type MUISize    = 'small' | 'medium' | 'large';
type MUIColor   = 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';

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
	color?:     MUIColor;
	fullWidth?: boolean;
	startIcon?: React.ReactNode;
	endIcon?:   React.ReactNode;
	disableElevation?: boolean;
	sx?:        unknown;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
	{
		variant = 'contained',
		size = 'medium',
		color: _color,
		fullWidth,
		startIcon,
		endIcon,
		disableElevation: _de,
		sx: _sx,
		className,
		children,
		...rest
	},
	ref
) {
	const v = (VARIANT_MAP as Record<string, ComponentProps<typeof ShadcnButton>['variant']>)[variant as string] ?? variant as ComponentProps<typeof ShadcnButton>['variant'];
	const s = (SIZE_MAP as Record<string, ComponentProps<typeof ShadcnButton>['size']>)[size as string] ?? size as ComponentProps<typeof ShadcnButton>['size'];
	return (
		<ShadcnButton
			ref={ref}
			variant={v}
			size={s}
			className={fullWidth ? `w-full ${className ?? ''}` : className}
			{...rest}
		>
			{startIcon}
			{children}
			{endIcon}
		</ShadcnButton>
	);
});

export default Button;
