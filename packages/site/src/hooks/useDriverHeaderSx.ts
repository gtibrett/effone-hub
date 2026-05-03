import {useDriver} from '@/hooks/data';
import {DriverId} from '@/types';
import {SxProps, useTheme} from '@mui/material';
import useGetTeamColor from './useGetTeamColor';

export function useDriverHeaderSx(driverId: DriverId, year?: 'current' | number): SxProps;
export function useDriverHeaderSx(driverId: DriverId, color: string): SxProps;

export default function useDriverHeaderSx(driverId: DriverId, yearOrColor: any = 'current'): SxProps {
	const theme        = useTheme();
	const driver       = useDriver(driverId ?? undefined);
	const getTeamColor = useGetTeamColor();
	
	let background = getTeamColor(
		yearOrColor === 'current'
		? driver?.seasonEntrantDrivers?.nodes?.[0]?.constructor?.colors
		: driver?.seasonEntrantDrivers?.nodes?.find((t: any) => t.year === yearOrColor)?.constructor?.colors,
		'primaryHex', false);
	
	if (typeof yearOrColor === 'string' && yearOrColor !== 'current') {
		background = yearOrColor;
	}
	
	const color = theme.palette.getContrastText(background);
	
	return {
		background, color,
		
		'& .MuiTypography-root, & .MuiTableCell-root': {
			background, color
		}
	};
}