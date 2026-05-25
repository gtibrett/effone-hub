/**
 * Avatar — img-or-fallback box with a fixed-size scale.
 *
 * `size` accepts the legacy named scales the codebase still uses. Numbers
 * are no longer supported through this prop; callers that need a custom
 * pixel size pass `className="w-[80px] h-[80px]"` instead. Team-colored
 * avatars wrap themselves in a `bg-team-primary text-team-foreground`
 * scope and inject the CSS vars via inline `style` on the wrapping
 * element (NOT on Avatar itself).
 */
import Image from 'next/image';
import {HTMLAttributes, ReactNode, forwardRef, useState} from 'react';
import {cn} from '@/lib/utils';

const SIZE: Record<string, string> = {
	xs:     'size-6 text-xs',
	sm:     'size-8 text-sm',
	md:     'size-10 text-base',
	lg:     'size-16 text-lg',
	xl:     'size-32 text-2xl',
	small:  'size-8 text-sm',
	medium: 'size-16 text-base',
	large:  'size-32 text-2xl'
};

export type AvatarProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
	variant?:  'circular' | 'rounded' | 'square';
	size?:     keyof typeof SIZE;
	src?:      string;
	alt?:      string;
	children?: ReactNode;
};

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(function Avatar(
	{variant = 'circular', size, src, alt, className, children, ...rest},
	ref
) {
	const [imgFailed, setImgFailed] = useState(false);
	const shape =
		variant === 'rounded' ? 'rounded-md' :
		variant === 'square'  ? '' :
		'rounded-full';

	return (
		<div
			ref={ref}
			className={cn(
				'inline-flex items-center justify-center overflow-hidden bg-muted text-muted-foreground relative',
				size ? SIZE[size] : 'size-10',
				shape,
				className
			)}
			{...rest}
		>
			{src && !imgFailed
				? <Image fill src={src} alt={alt ?? ''} className="w-full h-full object-cover" onError={() => setImgFailed(true)}/>
				: children
			}
		</div>
	);
});

export default Avatar;
