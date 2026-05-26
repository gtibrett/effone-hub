/**
 * Returns {className, style} for a driver-header strip — team-color bg
 * with contrast text via CSS `contrast-color()`. The Tailwind arbitrary
 * variants below cascade the same bg/fg into nested MuiTypography /
 * MuiTableCell descendants (matches the old SX cascade).
 */
import {useDriver} from '@/hooks/data';
import {DriverId} from '@/types';
import type {CSSProperties} from 'react';
import useGetTeamColor from './useGetTeamColor';

export type HeaderStyle = {
	className: string;
	style:     CSSProperties;
};

// Static class string so Tailwind's scanner picks it up at build.
const HEADER_CLASS = 'bg-(--header-bg) text-(--header-fg) [&_.MuiTypography-root]:bg-(--header-bg) [&_.MuiTypography-root]:text-(--header-fg) [&_.MuiTableCell-root]:bg-(--header-bg) [&_.MuiTableCell-root]:text-(--header-fg)';

export function useDriverHeaderSx(driverId: DriverId, year?: 'current' | number): HeaderStyle;
export function useDriverHeaderSx(driverId: DriverId, color: string): HeaderStyle;

export default function useDriverHeaderSx(driverId: DriverId, yearOrColor: any = 'current'): HeaderStyle {
	const driver       = useDriver(driverId ?? undefined);
	const getTeamColor = useGetTeamColor();

	let background = getTeamColor(
		yearOrColor === 'current'
		? driver?.seasonEntrantDrivers?.nodes?.[0]?.team?.colors
		: driver?.seasonEntrantDrivers?.nodes?.find((t: any) => t.year === yearOrColor)?.team?.colors,
		'primaryHex'
	);

	if (typeof yearOrColor === 'string' && yearOrColor !== 'current') {
		background = yearOrColor;
	}

	return {
		className: HEADER_CLASS,
		style:     {
			['--header-bg' as string]: background,
			['--header-fg' as string]: `contrast-color(${background} vs white, black)`
		} as CSSProperties
	};
}
