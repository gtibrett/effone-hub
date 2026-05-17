'use client';

/**
 * Drop-in for `@mui/material/Avatar`. Renders an img-or-fallback box
 * with the rounded/circular variant shapes. Accepts MUI's `sx` (read
 * for width/height + bgcolor only — we map known keys into inline
 * style) so callsites passing `sx={useAvatarSize(...)}` keep working.
 */
import {CSSProperties, HTMLAttributes, ReactNode, forwardRef, useState} from 'react';
import {cn} from '@/lib/utils';

type Sx = {
	width?:           CSSProperties['width'];
	height?:          CSSProperties['height'];
	bgcolor?:         string;
	backgroundColor?: string;
	color?:           string;
	[k: string]:      unknown;
};

export type AvatarProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
	variant?: 'circular' | 'rounded' | 'square';
	src?:     string;
	alt?:     string;
	sx?:      Sx | unknown;
	children?: ReactNode;
};

function sxToStyle(sx: unknown): CSSProperties {
	if (!sx || typeof sx !== 'object') return {};
	const s = sx as Sx;
	const out: CSSProperties = {};
	if (s.width  !== undefined) out.width  = s.width;
	if (s.height !== undefined) out.height = s.height;
	if (s.bgcolor !== undefined) out.backgroundColor = s.bgcolor;
	if (s.backgroundColor !== undefined) out.backgroundColor = s.backgroundColor;
	if (s.color !== undefined) out.color = s.color;
	return out;
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(function Avatar(
	{variant = 'circular', src, alt, sx, className, style, children, ...rest},
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
				'inline-flex items-center justify-center overflow-hidden bg-muted text-foreground/80',
				'w-10 h-10',
				shape,
				className
			)}
			style={{...sxToStyle(sx), ...style}}
			{...rest}
		>
			{src && !imgFailed
				? <img src={src} alt={alt ?? ''} className="w-full h-full object-cover" onError={() => setImgFailed(true)}/>
				: children
			}
		</div>
	);
});

export default Avatar;
