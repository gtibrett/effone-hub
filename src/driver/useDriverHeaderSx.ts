import {DriverId, useDriver} from '@effonehub/driver';
import {SxProps, useTheme} from '@mui/material';

export function useDriverHeaderSx(driverId: DriverId, year?: 'current' | number): SxProps;
export function useDriverHeaderSx(driverId: DriverId, color: string): SxProps;

export default function useDriverHeaderSx(driverId: DriverId, yearOrColor: any = 'current'): SxProps {
	const theme  = useTheme();
	const driver = useDriver(driverId);
	
	let background = (yearOrColor === 'current'
	                  ? driver?.currentTeam.team.colors.primary
	                  : driver?.teamsByYear.find(t => t.year === yearOrColor)?.team.colors.primary) || theme.palette.primary.main;
	
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