/**
 * Returns {className, style} for a driver-header strip. Team-color bg + contrast-color() fg.
 * Cascades bg/fg into nested MuiTypography / MuiTableCell via Tailwind arbitrary variants.
 */

import type { CSSProperties } from 'react';

import { useDriverDisplay } from '@/components/app/EntityDisplayProvider';
import type { DriverId } from '@/types';

import useGetTeamColor from './useGetTeamColor';

export type HeaderStyle = {
	className: string;
	style: CSSProperties;
};

const HEADER_CLASS =
	'bg-(--header-bg) text-(--header-fg) [&_.MuiTypography-root]:bg-(--header-bg) [&_.MuiTypography-root]:text-(--header-fg) [&_.MuiTableCell-root]:bg-(--header-bg) [&_.MuiTableCell-root]:text-(--header-fg)';

// `yearOrColor`: 'current' (driver's current team) | an explicit color string.
// Year-based lookup removed — data must come from context/objectProp.
function useDriverHeaderSx(
	driverId: DriverId,
	yearOrColor: 'current' | number | string | undefined = 'current'
): HeaderStyle {
	const display = useDriverDisplay(driverId);
	const getTeamColor = useGetTeamColor();

	let background = getTeamColor(
		yearOrColor === 'current' ? display?.teamColors : undefined,
		'primaryHex'
	);

	if (typeof yearOrColor === 'string' && yearOrColor !== 'current') {
		background = yearOrColor;
	}

	return {
		className: HEADER_CLASS,
		style: {
			['--header-bg' as string]: background,
			['--header-fg' as string]: `contrast-color(${background})`
		} as CSSProperties
	};
}

export default useDriverHeaderSx;
