import {Box, Container, CssBaseline, SxProps, ThemeProvider} from '@mui/material';
import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import ConstructorProvider from '../constructors/ConstructorProvider';
import DriverProvider from '../drivers/DriverProvider';
import {Header, SkipNav, UkraineButton, useEffTheme} from '../ui-components';
import AppStateProvider from './AppStateProvider';
import GoogleAnalyticsProvider from './GoogleAnalyticsProvider';
import Routes from './Routes';

function App() {
	const theme = useEffTheme();
	
	const sx: SxProps = {
		py:         2,
		position:   'relative',
		'&:before': {
			position:        'absolute',
			top:             0, left: 0,
			zIndex:          -1,
			width:           '100%',
			height:          '100%',
			content:         '" "',
			backgroundImage: `url(${require('../ui-components/carbon-fiber-texture.png')})`,
			opacity:         theme.palette.mode === 'dark' ? .35 : 1
		}
	};
	
	return (
		<AppStateProvider>
			<CssBaseline/>
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<GoogleAnalyticsProvider>
						<ConstructorProvider>
							<DriverProvider>
								<SkipNav/>
								
								<Box sx={{position: 'fixed', overflow: 'auto', scrollbarColor: theme.palette.mode, top: 0, left: 0, right: 0, bottom: 0, background: theme.palette.background.default}}>
									<Header/>
									
									<Container maxWidth="xl" component="main" sx={sx} tabIndex={0}>
										<Routes/>
									</Container>
									
									<UkraineButton/>
								</Box>
							</DriverProvider>
						</ConstructorProvider>
					</GoogleAnalyticsProvider>
				</BrowserRouter>
			</ThemeProvider>
		</AppStateProvider>
	);
}

export default App;
