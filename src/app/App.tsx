import {ApolloProvider} from '@apollo/client';
import {GoogleAnalyticsProvider} from '@gtibrett/mui-additions';
import {Backdrop, CssBaseline, ThemeProvider} from '@mui/material';
import {BrowserRouter} from 'react-router-dom';
import {useEffTheme} from '../ui-components';
import useApolloClient from '../useApolloClient';
import AppStateProvider from './AppStateProvider';
import Routes from './Routes';

export default function App() {
	const theme           = useEffTheme();
	const {client, ready} = useApolloClient();
	
	if (!ready) {
		return (
			<AppStateProvider>
				<CssBaseline/>
				<ThemeProvider theme={theme}>
					<Backdrop open/>
				</ThemeProvider>
			</AppStateProvider>
		);
	}
	
	return (
		<AppStateProvider>
			<ApolloProvider client={client}>
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