import {useEffTheme} from '@/components/ui';
import useApolloClient from '@/useApolloClient';
import {ApolloProvider} from '@apollo/client';
import {SkipNav, UkraineButton} from '@gtibrett/mui-additions';
import {Box, Container, CssBaseline, SxProps, ThemeProvider} from '@mui/material';
import {PropsWithChildren} from 'react';
import AppStateProvider from './AppStateProvider';
import ErrorBoundary from './ErrorBoundary';
import Footer from './footer/Footer';
import Header from './header/Header';

export default function Layout({children}: PropsWithChildren) {
	const theme    = useEffTheme();
	const {client} = useApolloClient();
	
	const sx: SxProps = {
		py:       2,
		position: 'relative'
	};
	
	return (
		<ApolloProvider client={client}>
			<CssBaseline/>
			<ThemeProvider theme={theme}>
				<AppStateProvider>
					<SkipNav selector="main"/>
					
					<Box sx={{position: 'fixed', overflow: 'auto', scrollbarColor: theme.palette.mode, top: 0, left: 0, right: 0, bottom: 0, background: theme.palette.background.default}}>
						<Header/>
						
						<Container maxWidth="xl" component="main" sx={sx} tabIndex={0}>
							<ErrorBoundary>
								{children}
							</ErrorBoundary>
						</Container>
						
						<Footer/>
						<UkraineButton/>
					</Box>
				</AppStateProvider>
			</ThemeProvider>
		</ApolloProvider>
	);
}