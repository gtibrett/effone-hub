/*@formatter:off*/
import type {} from '@mui/x-data-grid/themeAugmentation';
/*@formatter:off*/
import {createTheme, useMediaQuery, useTheme} from '@mui/material';
import {blueGrey, deepOrange} from '@mui/material/colors';
import {useMemo} from 'react';

export const useEffTheme = (overrideMode?: 'light' | 'dark') => {
	const prefersDarkMode = (useMediaQuery('(prefers-color-scheme: dark)') && overrideMode !== 'light') || overrideMode === 'dark';
	
	return useMemo(() => createTheme({
		palette: {
			mode: prefersDarkMode ? 'dark' : 'light',
			primary: {
				main: blueGrey[800]
			},
			secondary: {
				main: deepOrange[700]
			},
			background: {
				paper: prefersDarkMode ? blueGrey[900] : '#FFFFFF',
				default: prefersDarkMode ? blueGrey[700] : blueGrey[100]
			}
		},
		components: {
			MuiDataGrid: {
				styleOverrides: {
					'root': {
						border: 0,
						overflow: 'auto',
						'& > .MuiDataGrid-main': {
							overflow: 'unset'
						},
						'& > div > .MuiDataGrid-footerContainer': {
							display: 'none'
						}
					}
				}
			}
		}
	}), [prefersDarkMode]);
};

export const useInvertedTheme = () => {
	const theme = useTheme();
	return useEffTheme(theme.palette.mode === 'light' ? 'dark' : 'light');
};