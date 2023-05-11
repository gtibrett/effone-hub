import {Box, Container, CssBaseline, SxProps, ThemeProvider} from '@mui/material';
import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import ConstructorProvider from '../constructors/ConstructorProvider';
import DriverProvider from '../drivers/DriverProvider';
import {Circuits, Constructors, Driver, Drivers, Home, Race} from '../pages';
import About from '../pages/About';
import Circuit from '../pages/Circuit';
import Constructor from '../pages/Constructor';
import Header from '../ui-components/Header';
import SkipNav from '../ui-components/SkipNav';
import {useEffTheme} from '../ui-components/Theme';
import UkraineButton from '../ui-components/UkraineButton';
import AppStateProvider from './AppStateProvider';
import ErrorBoundary from './ErrorBoundary';
import GoogleAnalyticsProvider from './GoogleAnalyticsProvider';

function Index() {
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
									
									<Container maxWidth="xl" component="main" sx={sx}>
										<ErrorBoundary>
											<Routes>
												<Route
													element={<Home/>}
													path="/"
												/>
												<Route
													element={<About/>}
													path="/about"
												/>
												<Route
													element={<Circuit/>}
													path="/circuit/:circuitId"
												/>
												<Route
													element={<Circuits/>}
													path="/circuits"
												/>
												<Route
													element={<Constructor/>}
													path="/constructor/:id"
												/>
												<Route
													element={<Constructors/>}
													path="/constructors"
												/>
												<Route
													element={<Driver/>}
													path="/driver/:id"
												/>
												<Route
													element={<Drivers/>}
													path="/drivers"
												/>
												<Route
													element={<Race/>}
													path="/race/:season?/:round?"
												/>
											</Routes>
										</ErrorBoundary>
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

export default Index;
