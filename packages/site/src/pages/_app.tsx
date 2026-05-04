import '@fontsource/anton';
import '@fontsource/roboto';
import '@fontsource/roboto-mono';
import '@fontsource/racing-sans-one';
import '@fontsource/titillium-web';
import '@fortawesome/fontawesome-svg-core/styles.css';
import {Layout} from '@/components/app';
import {useEffTheme} from '@/components/ui';
import useApolloClient from '@/useApolloClient';
import {ApolloProvider} from '@apollo/client';
import {config} from '@fortawesome/fontawesome-svg-core';
import {CssBaseline, ThemeProvider} from '@mui/material';
import {AppCacheProvider} from '@mui/material-nextjs/v14-pagesRouter';
import {GoogleAnalytics} from '@next/third-parties/google';
import {FC} from 'react';

config.autoAddCss = false;

type AppProps = {
	Component: FC,
	pageProps: any
}

export default function App({Component, pageProps}: AppProps) {
	const theme    = useEffTheme();
	const {client} = useApolloClient();

	return (
		<AppCacheProvider {...pageProps}>
			<ApolloProvider client={client}>
				<ThemeProvider theme={theme}>
					<CssBaseline/>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</ThemeProvider>
			</ApolloProvider>
			{process.env.NEXT_PUBLIC_GA_TRACKING_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_TRACKING_ID}/>}
		</AppCacheProvider>
	);
}