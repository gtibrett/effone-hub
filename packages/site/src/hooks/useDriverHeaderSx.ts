import {CSSProperties} from 'react';
import {useTheme} from '@/lib/theme';
import {useDriver} from '@/hooks/data';
import {DriverId} from '@/types';
import useGetTeamColor from './useGetTeamColor';

export function useDriverHeaderSx(driverId: DriverId, year?: 'current' | number): CSSProperties;
export function useDriverHeaderSx(driverId: DriverId, color: string): CSSProperties;

export default function useDriverHeaderSx(driverId: DriverId, yearOrColor: any = 'current'): CSSProperties {
	const theme        = useTheme();
	const driver       = useDriver(driverId ?? undefined);
	const getTeamColor = useGetTeamColor();

	let background = getTeamColor(
		yearOrColor === 'current'
		? driver?.seasonEntrantDrivers?.nodes?.[0]?.team?.colors
		: driver?.seasonEntrantDrivers?.nodes?.find((t: any) => t.year === yearOrColor)?.team?.colors,
		'primaryHex', false);

	if (typeof yearOrColor === 'string' && yearOrColor !== 'current') {
		background = yearOrColor;
	}

	const color = theme.palette.getContrastText(background);

	return {background, color};
}
