import {Box, ThemeProvider} from '@mui/material';
import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import DriverProvider from '../drivers/DriverProvider';
import {Driver, Home, Race} from '../pages';
import Header from '../ui-components/Header';
import {useEffTheme} from '../ui-components/Theme';
import AppStateProvider from './AppStateProvider';
import ErrorBoundary from './ErrorBoundary';

function Index() {
	const theme = useEffTheme();
	
	return (
		<AppStateProvider>
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<DriverProvider>
						<Header/>
						
						<Box component="main" p={2}>
							<ErrorBoundary>
								<Routes>
									<Route
										element={<Home/>}
										path="/"
									/>
									<Route
										element={<Driver/>}
										path="/driver/:id"
									/>
									<Route
										element={<Race/>}
										path="/race/:season?/:round?"
									/>
								</Routes>
							</ErrorBoundary>
						</Box>
						<footer>
						
						</footer>
					</DriverProvider>
				</BrowserRouter>
			</ThemeProvider>
		</AppStateProvider>
	);
}

export default Index;
