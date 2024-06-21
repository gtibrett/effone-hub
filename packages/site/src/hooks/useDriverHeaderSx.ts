import {useDriver} from '@/hooks/data';
import {DriverId} from '@/types';
import {SxProps, useTheme} from '@mui/material';
import useGetTeamColor from './useGetTeamColor';

export function useDriverHeaderSx(driverId: DriverId, year?: 'current' | number): SxProps;
export function useDriverHeaderSx(driverId: DriverId, color: string): SxProps;

export default function useDriverHeaderSx(driverId: DriverId, yearOrColor: any = 'current'): SxProps {
	const theme        = useTheme();
	const driver       = useDriver(driverId);
	const getTeamColor = useGetTeamColor();
	
	let background = getTeamColor(
		yearOrColor === 'current'
		? driver?.currentTeam?.team?.colors
		: driver?.teamsByYear.find(t => t.year === yearOrColor)?.team?.colors,
		'primary', false);
	
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