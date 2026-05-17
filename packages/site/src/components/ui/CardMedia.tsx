'use client';

import {HTMLAttributes, ReactNode, forwardRef} from 'react';
import {cn} from '@/lib/utils';

export type CardMediaProps = HTMLAttributes<HTMLDivElement> & {
	component?: 'img' | 'div';
	image?:     string;
	src?:       string;
	alt?:       string;
	height?:    number | string;
	sx?:        unknown;
	children?:  ReactNode;
};

const CardMedia = forwardRef<HTMLDivElement, CardMediaProps>(function CardMedia(
	{component = 'div', image, src, alt, height, sx: _sx, className, style, children, ...rest},
	ref
) {
	const url = image ?? src;
	const styleWithBg = url
		? {backgroundImage: `url(${url})`, backgroundSize: 'cover', backgroundPosition: 'center', ...style}
		: style;
	return (
		<div
			ref={ref}
			className={cn('relative w-full bg-muted overflow-hidden', className)}
			style={{...(height ? {height} : {}), ...styleWithBg}}
			{...rest}
		>
			{children}
		</div>
	);
});

export default CardMedia;
