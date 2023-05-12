import type {} from '@mui/x-data-grid/themeAugmentation';
import {alpha, createTheme, useMediaQuery, useTheme} from '@mui/material';
import {blueGrey, red} from '@mui/material/colors';
import {useMemo} from 'react';

export const useEffTheme = (overrideMode?: 'light' | 'dark') => {
	const prefersDarkMode = (useMediaQuery('(prefers-color-scheme: dark)') && overrideMode !== 'light') || overrideMode === 'dark';
	
	return useMemo(() => createTheme({
		palette:    {
			mode:       prefersDarkMode ? 'dark' : 'light',
			primary:    {
				main: blueGrey[prefersDarkMode ? 400 : 800]
			},
			secondary:  {
				main: red[prefersDarkMode ? 200 : 900]
			},
			background: {
				paper:   prefersDarkMode ? blueGrey[900] : '#fff',
				default: prefersDarkMode ? blueGrey[800] : blueGrey[200]
			}
		},
		typography: {
			h1: {
				fontSize: 48
			},
			h2: {
				fontSize: 24
			},
			h3: {
				fontSize: 20
			},
			h4: {
				fontSize: 14
			}
		},
		components: {
			MuiCard:         {
				defaultProps:   {
					elevation: 0
				},
				styleOverrides: {
					root: {
						overflow: 'visible'
					}
				}
			},
			MuiCardHeader:   {
				defaultProps: {
					titleTypographyProps: {
						variant: 'h3'
					}
				}
			},
			MuiDataGrid:     {
				styleOverrides: {
					root: {
						border:                                   0,
						overflow:                                 'auto',
						'& > .MuiDataGrid-main':                  {
							overflow: 'unset'
						},
						'& > div > .MuiDataGrid-footerContainer': {
							display: 'none'
						}
					}
				}
			},
			MuiDialog:       {
				styleOverrides: {
					paper: {
						background: prefersDarkMode ? blueGrey[900] : '#fff'
					}
				}
			},
			MuiBackdrop:     {
				styleOverrides: {
					root: {
						background:     alpha(blueGrey[prefersDarkMode ? 700 : 600], .5),
						backdropFilter: `blur(5px) grayscale(100%)`
					}
				}
			},
			MuiListItemIcon: {
				styleOverrides: {
					root: {
						minWidth: 36
					}
				}
			},
			MuiTab:          {
				styleOverrides: {
					root: {
						'&.Mui-selected': {
							color: prefersDarkMode ? '#FFF' : '#000',
							fontWeight: 'bold'
						}
					}
				}
			},
			MuiToggleButton: {
				styleOverrides: {
					root: {
						borderColor: blueGrey[prefersDarkMode ? 400 : 200],
						
						'&.Mui-selected': {
							backgroundColor: blueGrey[prefersDarkMode ? 400 : 600],
							color:           prefersDarkMode ? '#000' : '#fff'
						},
						
						'&:hover, &:focus': {
							backgroundColor: `${blueGrey[prefersDarkMode ? 300 : 700]} !important`,
							color:           prefersDarkMode ? '#000' : '#fff'
						}
					}
				}
			}
		}
	}), [prefersDarkMode]);
};

export const useInvertedTheme = () => {
	const theme = useEffTheme();
	return useEffTheme(theme.palette.mode === 'light' ? 'dark' : 'light');
};

export const useDarkMode = () => useTheme().palette.mode === 'dark';