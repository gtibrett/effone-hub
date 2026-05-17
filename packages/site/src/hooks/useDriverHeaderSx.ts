import {getContrastText} from '@/lib/color';
import {useDriver} from '@/hooks/data';
import {DriverId} from '@/types';
import useGetTeamColor from './useGetTeamColor';

export type DriverHeaderColors = {
	primary:    string;
	foreground: string;
};

export function useDriverHeaderSx(driverId: DriverId, year?: 'current' | number): DriverHeaderColors;
export function useDriverHeaderSx(driverId: DriverId, color: string): DriverHeaderColors;

export default function useDriverHeaderSx(driverId: DriverId, yearOrColor: any = 'current'): DriverHeaderColors {
	const driver       = useDriver(driverId ?? undefined);
	const getTeamColor = useGetTeamColor();

	let primary = getTeamColor(
		yearOrColor === 'current'
		? driver?.seasonEntrantDrivers?.nodes?.[0]?.team?.colors
		: driver?.seasonEntrantDrivers?.nodes?.find((t: any) => t.year === yearOrColor)?.team?.colors,
		'primaryHex', false);

	if (typeof yearOrColor === 'string' && yearOrColor !== 'current') {
		primary = yearOrColor;
	}

	const foreground = getContrastText(primary);

	return {primary, foreground};
}
