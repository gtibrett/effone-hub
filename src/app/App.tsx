import {ApolloProvider} from '@apollo/client';
import {useEffTheme} from '@effonehub/ui-components';
import {GoogleAnalyticsProvider} from '@gtibrett/mui-additions/react-router';
import {CssBaseline, ThemeProvider} from '@mui/material';
import {BrowserRouter} from 'react-router-dom';
import useApolloClient from '../useApolloClient';
import AppStateProvider from './AppStateProvider';
import Routes from './Routes';

const ThemedApp = () => {
	const theme = useEffTheme();
	
	return (
		<ThemeProvider theme={theme}>
			<Routes/>
		</ThemeProvider>
	);
};

export default function App() {
	const {client} = useApolloClient();
	
	return (
		<ApolloProvider client={client}>
			<AppStateProvider>
				<BrowserRouter>
					<GoogleAnalyticsProvider trackingId={process.env.REACT_APP_GA_TRACKING_ID}>
						<CssBaseline/>
						<ThemedApp/>
					</GoogleAnalyticsProvider>
				</BrowserRouter>
			</AppStateProvider>
		</ApolloProvider>
	);
}