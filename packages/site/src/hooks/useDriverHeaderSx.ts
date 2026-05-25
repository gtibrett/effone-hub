import {useDriver} from '@/hooks/data';
import {getContrastText, getCssContrast, SUPPORTS_CONTRAST_COLOR} from '@/lib/useContrastText';
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
		'primaryHex', false);

	if (typeof yearOrColor === 'string' && yearOrColor !== 'current') {
		background = yearOrColor;
	}

	const color           = getContrastText(background);
	const cssOnlyContrast = {[SUPPORTS_CONTRAST_COLOR]: {color: getCssContrast(background)}};

	return {
		background, color, ...cssOnlyContrast,

		'& .MuiTypography-root, & .MuiTableCell-root': {
			background, color, ...cssOnlyContrast
		}
	};
}