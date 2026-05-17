/**
 * CardMedia — image-backed banner slot for a Card. No sx, no inline color
 * styles. Callers can size with Tailwind className (`h-32`, `aspect-video`,
 * etc.); the image URL is the one bit of runtime data still passed as a
 * prop because it varies per row.
 */
import {HTMLAttributes, ReactNode, forwardRef} from 'react';
import {cn} from '@/lib/utils';

export type CardMediaProps = HTMLAttributes<HTMLDivElement> & {
	image?:    string;
	alt?:      string;
	children?: ReactNode;
};

const CardMedia = forwardRef<HTMLDivElement, CardMediaProps>(function CardMedia(
	{image, alt, className, children, style, ...rest},
	ref
) {
	const bg = image ? {backgroundImage: `url(${image})`, ...style} : style;
	return (
		<div
			ref={ref}
			role={image ? 'img' : undefined}
			aria-label={image ? alt : undefined}
			className={cn(
				'relative w-full bg-muted overflow-hidden bg-cover bg-center',
				className
			)}
			style={bg}
			{...rest}
		>
			{children}
		</div>
	);
});

export default CardMedia;
