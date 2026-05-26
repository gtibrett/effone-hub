/**
 * Returns {className, style} for a driver-header strip. Team-color bg + contrast-color() fg.
 * Cascades bg/fg into nested MuiTypography / MuiTableCell via Tailwind arbitrary variants.
 */

import type { CSSProperties } from 'react';

import { useDriver } from '@/hooks/data';
import { DriverId } from '@/types';

import useGetTeamColor from './useGetTeamColor';

export type HeaderStyle = {
	className: string;
	style: CSSProperties;
};

const HEADER_CLASS =
	'bg-(--header-bg) text-(--header-fg) [&_.MuiTypography-root]:bg-(--header-bg) [&_.MuiTypography-root]:text-(--header-fg) [&_.MuiTableCell-root]:bg-(--header-bg) [&_.MuiTableCell-root]:text-(--header-fg)';

export function useDriverHeaderSx(driverId: DriverId, year?: 'current' | number): HeaderStyle;
export function useDriverHeaderSx(driverId: DriverId, color: string): HeaderStyle;

export default function useDriverHeaderSx(
	driverId: DriverId,
	yearOrColor: any = 'current'
): HeaderStyle {
	const driver = useDriver(driverId ?? undefined);
	const getTeamColor = useGetTeamColor();

	let background = getTeamColor(
		yearOrColor === 'current'
			? driver?.seasonEntrantDrivers?.[0]?.team?.colors
			: driver?.seasonEntrantDrivers?.find((t: any) => t.year === yearOrColor)?.team?.colors,
		'primaryHex'
	);

	if (typeof yearOrColor === 'string' && yearOrColor !== 'current') {
		background = yearOrColor;
	}

	return {
		className: HEADER_CLASS,
		style: {
			['--header-bg' as string]: background,
			['--header-fg' as string]: `contrast-color(${background} vs white, black)`
		} as CSSProperties
	};
}
