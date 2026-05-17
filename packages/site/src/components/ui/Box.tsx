/**
 * Plain styled-div wrapper. Accepts only `className`, `component` (polymorphic
 * tag override), and the native HTML attributes for the resolved element.
 *
 * No `sx`, no spacing-arithmetic shorthands (m/p/mt/px/...), no `style`-
 * driven color overrides. Tailwind is the only styling surface.
 */
import {ElementType, HTMLAttributes, ReactNode, forwardRef} from 'react';
import {cn} from '@/lib/utils';

export type BoxProps = HTMLAttributes<HTMLElement> & {
	component?: ElementType;
	children?:  ReactNode;
};

const Box = forwardRef<HTMLElement, BoxProps>(function Box(
	{component, className, children, ...rest},
	ref
) {
	const Tag = (component ?? 'div') as ElementType;
	return (
		<Tag ref={ref as never} className={cn(className)} {...rest}>
			{children}
		</Tag>
	);
});

export default Box;
