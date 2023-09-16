import {ApolloProvider} from '@apollo/client';
import {GoogleAnalyticsProvider} from '@gtibrett/mui-additions';
import {CssBaseline, ThemeProvider} from '@mui/material';
import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import useApolloClient from '../useApolloClient';
import {useEffTheme} from '../ui-components';
import AppStateProvider from './AppStateProvider';
import Routes from './Routes';

export default function App() {
	const theme        = useEffTheme();
	const apolloClient = useApolloClient();
	
	return (
		<AppStateProvider>
			<ApolloProvider client={apolloClient}>
				<CssBaseline/>
				<ThemeProvider theme={theme}>
					<BrowserRouter>
						<GoogleAnalyticsProvider trackingId={process.env.REACT_APP_GA_TRACKING_ID}>
							<Routes/>
						</GoogleAnalyticsProvider>
					</BrowserRouter>
				</ThemeProvider>
			</ApolloProvider>
		</AppStateProvider>
	);
}