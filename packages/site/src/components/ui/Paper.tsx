import {HTMLAttributes, ReactNode, forwardRef} from 'react';
import {cn} from '@/lib/utils';

export type PaperProps = HTMLAttributes<HTMLDivElement> & {
	variant?:  'elevation' | 'outlined';
	square?:   boolean;
	children?: ReactNode;
};

const Paper = forwardRef<HTMLDivElement, PaperProps>(function Paper(
	{variant = 'elevation', square, className, children, ...rest},
	ref
) {
	return (
		<div
			ref={ref}
			className={cn(
				'bg-card text-card-foreground',
				!square && 'rounded-md',
				variant === 'outlined' && 'border',
				className
			)}
			{...rest}
		>
			{children}
		</div>
	);
});

export default Paper;
