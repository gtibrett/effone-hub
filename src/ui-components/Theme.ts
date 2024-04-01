import type {} from '@mui/x-data-grid/themeAugmentation';
import {alpha, createTheme, useMediaQuery, useTheme} from '@mui/material';
import {blueGrey, red} from '@mui/material/colors';
import {useMemo} from 'react';

export const useEffTheme = (overrideMode?: 'light' | 'dark') => {
	const prefersDarkMode = (useMediaQuery('(prefers-color-scheme: dark)') && overrideMode !== 'light') || overrideMode === 'dark';
	const spacing         = 8;
	const primary         = blueGrey;
	const secondary       = red;
	
	return useMemo(() => createTheme({
		spacing,
		palette:    {
			mode:       prefersDarkMode ? 'dark' : 'light',
			primary:    {
				main: primary[prefersDarkMode ? 400 : 800]
			},
			secondary:  {
				main: secondary[prefersDarkMode ? 200 : 900]
			},
			background: {
				paper:   prefersDarkMode ? primary[900] : '#fff',
				default: prefersDarkMode ? primary[800] : primary[200]
			}
		},
		typography: {
			fontFamily: "'Titillium Web', sans-serif",
			h1:         {
				fontSize: 48
			},
			h2:         {
				fontSize: 24
			},
			h3:         {
				fontSize: 20
			},
			h4:         {
				fontSize: 16
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
						border:                  0,
						overflow:                'auto',
						'& > .MuiDataGrid-main': {
							overflow: 'unset'
						}
					}
				}
			},
			MuiDialog:       {
				styleOverrides: {
					paper: {
						background: prefersDarkMode ? primary[900] : '#fff'
					}
				}
			},
			MuiBackdrop:     {
				styleOverrides: {
					root: {
						background:     alpha(primary[prefersDarkMode ? 100 : 900], prefersDarkMode ? .5 : .75),
						backdropFilter: `blur(5px) grayscale(100%)`,
						zIndex:         100000
					}
				}
			},
			MuiLink:         {
				defaultProps: {
					component: LinkBehavior
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
							color:      prefersDarkMode ? '#fff' : '#000',
							fontWeight: 'bold'
						}
					}
				}
			},
			MuiToggleButton: {
				styleOverrides: {
					root: {
						padding:     `${spacing / 4}px ${spacing}px`,
						borderColor: secondary[prefersDarkMode ? 400 : 900],
						color:       secondary[prefersDarkMode ? 400 : 900],
						
						'&.Mui-selected': {
							backgroundColor: secondary[prefersDarkMode ? 400 : 900],
							color:           prefersDarkMode ? '#000' : '#fff'
						},
						
						'&:hover, &:focus': {
							backgroundColor: `${primary[prefersDarkMode ? 400 : 900]} !important`,
							color:           prefersDarkMode ? '#000' : '#fff'
						}
					}
				}
			}
		}
	}), [primary, secondary, spacing, prefersDarkMode]);
};

export const useInvertedTheme = () => {
	const theme = useTheme();
	return useEffTheme(theme.palette.mode === 'light' ? 'dark' : 'light');
};

export const useDarkMode = () => useTheme().palette.mode === 'dark';