import {ApolloProvider} from '@apollo/client';
import {useEffTheme} from '@effonehub/ui-components';
import {GoogleAnalyticsProvider} from '@gtibrett/mui-additions/react-router';
import {CssBaseline, ThemeProvider} from '@mui/material';
import {BrowserRouter} from 'react-router-dom';
import useApolloClient from '../useApolloClient';
import AppStateProvider from './AppStateProvider';
import Routes from './Routes';

export default function App() {
	const theme    = useEffTheme();
	const {client} = useApolloClient();
	
	return (
		<ApolloProvider client={client}>
			<CssBaseline/>
			<ThemeProvider theme={theme}>
				<AppStateProvider>
					<BrowserRouter>
						<GoogleAnalyticsProvider trackingId={process.env.REACT_APP_GA_TRACKING_ID}>
							<Routes/>
						</GoogleAnalyticsProvider>
					</BrowserRouter>
				</AppStateProvider>
			</ThemeProvider>
		</ApolloProvider>
	);
}