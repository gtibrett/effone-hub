/**
 * Identity hook — returns the input color unchanged.
 *
 * Previously walked the color channel-by-channel until WCAG contrast
 * met. That JS loop is gone in favor of pure-CSS contrast handling
 * (text color picks use `contrast-color()` via useContrastText; chart
 * line colors are the team color as-is). Kept as a hook so existing
 * call sites continue to compile.
 */
import {useCallback} from 'react';

export default function useGetAccessibleColor() {
	return useCallback((color: string, _force: boolean = false) => color, []);
}
