import './globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
// Load the Array.prototype extensions (removeDuplicates/sortByAttribute) once,
// globally for SSR — components use them without importing the polyfill.
import '@/polyfills';

import type { PropsWithChildren } from 'react';
import type { Metadata, Viewport } from 'next';
import { Anton, Racing_Sans_One, Titillium_Web } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';

import { getAppSeasonState } from './lib/cached-data';
import Providers from './Providers';

const titillium = Titillium_Web({
	weight: ['300', '400', '600', '700'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-titillium'
});

const anton = Anton({
	weight: '400',
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-anton'
});

const racing = Racing_Sans_One({
	weight: '400',
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-racing'
});

export const metadata: Metadata = {
	title: 'effOne Hub',
	description: 'Formula One data, race results, championship standings, and visualizations.',
	icons: { icon: '/effOne.svg' }
};

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1
};

export default async function RootLayout({ children }: PropsWithChildren) {
	const appSeasonState = await getAppSeasonState();
	return (
		<html lang="en" className={`${titillium.variable} ${anton.variable} ${racing.variable}`}>
			<body>
				<Providers appSeasonState={appSeasonState}>{children}</Providers>
				{process.env.NEXT_PUBLIC_GA_TRACKING_ID && (
					<GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_TRACKING_ID} />
				)}
			</body>
		</html>
	);
}
