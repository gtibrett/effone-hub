import './globals.css';

import '@fontsource/anton';
import '@fontsource/roboto';
import '@fontsource/roboto-mono';
import '@fontsource/racing-sans-one';
import '@fontsource/titillium-web';
import '@fortawesome/fontawesome-svg-core/styles.css';

import {GoogleAnalytics} from '@next/third-parties/google';
import type {Metadata, Viewport} from 'next';
import {PropsWithChildren} from 'react';
import Providers from './Providers';

export const metadata: Metadata = {
	title:       'effOne Hub',
	description: 'Formula One data, race results, championship standings, and visualizations.',
	icons:       {icon: '/effOne.svg'}
};

export const viewport: Viewport = {
	width:        'device-width',
	initialScale: 1
};

export default function RootLayout({children}: PropsWithChildren) {
	return (
		<html lang="en">
			<body>
				<Providers>{children}</Providers>
				{process.env.NEXT_PUBLIC_GA_TRACKING_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_TRACKING_ID}/>}
			</body>
		</html>
	);
}
