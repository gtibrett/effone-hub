/**
 * Drop-in replacement for `@mui/utils`'s `visuallyHidden` constant.
 * Used by consumers as an `sx`-style spread into Typography children
 * (e.g. screen-reader-only labels on icon buttons / chart bars).
 *
 * Preserve as an object so existing spreads compile; semantics match
 * Tailwind's `sr-only` (https://www.tailwindcss.com/docs/screen-readers).
 */
export const visuallyHidden = {
	border:   0,
	clip:     'rect(0 0 0 0)',
	height:   '1px',
	margin:   '-1px',
	overflow: 'hidden',
	padding:  0,
	position: 'absolute' as const,
	whiteSpace: 'nowrap' as const,
	width:    '1px'
};
