/**
 * Returns an sx-shaped style object for a driver-header strip — team
 * color bg with contrast-aware text via CSS `contrast-color()`. Cascades
 * into nested MuiTypography / MuiTableCell so portal tooltips paint
 * uniformly.
 */
import {useDriver} from '@/hooks/data';
import {DriverId} from '@/types';
import {SxProps} from '@mui/material';
import useGetTeamColor from './useGetTeamColor';

export function useDriverHeaderSx(driverId: DriverId, year?: 'current' | number): SxProps;
export function useDriverHeaderSx(driverId: DriverId, color: string): SxProps;

export default function useDriverHeaderSx(driverId: DriverId, yearOrColor: any = 'current'): SxProps {
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

	const color = `contrast-color(${background} vs white, black)`;

	return {
		background, color,

		'& .MuiTypography-root, & .MuiTableCell-root': {
			background, color
		}
	};
}
