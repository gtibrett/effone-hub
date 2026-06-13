/**
 * Returns {className, style} for a driver-header strip. Team-color bg + contrast-color() fg.
 * Cascades bg/fg into nested MuiTypography / MuiTableCell via Tailwind arbitrary variants.
 */

import type { CSSProperties } from 'react';

import { useDriver } from '@/hooks/data';
import type { DriverId } from '@/types';

import useGetTeamColor from './useGetTeamColor';

export type HeaderStyle = {
	className: string;
	style: CSSProperties;
};

const HEADER_CLASS =
	'bg-(--header-bg) text-(--header-fg) [&_.MuiTypography-root]:bg-(--header-bg) [&_.MuiTypography-root]:text-(--header-fg) [&_.MuiTableCell-root]:bg-(--header-bg) [&_.MuiTableCell-root]:text-(--header-fg)';

// `yearOrColor`: 'current' (driver's current team) | a season year (number) |
// an explicit color string. Optional — callers may pass an undefined color.
function useDriverHeaderSx(
	driverId: DriverId,
	yearOrColor: 'current' | number | string | undefined = 'current'
): HeaderStyle {
	const driver = useDriver(driverId ?? undefined);
	const getTeamColor = useGetTeamColor();

	let background = getTeamColor(
		yearOrColor === 'current'
			? driver?.seasonEntrantDrivers?.[0]?.team?.colors
			: driver?.seasonEntrantDrivers?.find(t => t.year === yearOrColor)?.team?.colors,
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
