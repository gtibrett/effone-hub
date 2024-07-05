import '@fontsource/anton';
import '@fontsource/roboto';
import '@fontsource/roboto-mono';
import '@fontsource/racing-sans-one';
import '@fontsource/titillium-web';
import '@fortawesome/fontawesome-svg-core/styles.css';
import {Layout} from '@/components/app';
import {config} from '@fortawesome/fontawesome-svg-core';
import {AppCacheProvider} from '@mui/material-nextjs/v14-pagesRouter';
import {GoogleAnalytics} from '@next/third-parties/google';
import {FC} from 'react';

config.autoAddCss = false;

type AppProps = {
	Component: FC,
	pageProps: any
}

export default function App({Component, pageProps}: AppProps) {
	return (
		<AppCacheProvider {...pageProps}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
			{process.env.NEXT_PUBLIC_GA_TRACKING_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_TRACKING_ID}/>}
		</AppCacheProvider>
	);
}