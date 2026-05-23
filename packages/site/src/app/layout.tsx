import './globals.css';

import '@fortawesome/fontawesome-svg-core/styles.css';

import {GoogleAnalytics} from '@next/third-parties/google';
import type {Metadata, Viewport} from 'next';
import {Anton, Racing_Sans_One, Titillium_Web} from 'next/font/google';
import {PropsWithChildren} from 'react';
import Providers from './Providers';

const anton = Anton({
	subsets: ['latin'],
	weight:  ['400'],
	variable: '--next-font-anton',
	display:  'swap'
});

const racingSansOne = Racing_Sans_One({
	subsets:  ['latin'],
	weight:   ['400'],
	variable: '--next-font-racing-sans-one',
	display:  'swap'
});

const titilliumWeb = Titillium_Web({
	subsets:  ['latin'],
	weight:   ['400', '600', '700'],
	variable: '--next-font-titillium-web',
	display:  'swap'
});

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
		<html lang="en" className={`${anton.variable} ${racingSansOne.variable} ${titilliumWeb.variable}`}>
			<body className="bg-background text-foreground antialiased">
				<Providers>{children}</Providers>
				{process.env.NEXT_PUBLIC_GA_TRACKING_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_TRACKING_ID}/>}
			</body>
		</html>
	);
}
