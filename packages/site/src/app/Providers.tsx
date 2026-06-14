'use client';

import '@/polyfills';
import { type PropsWithChildren, Suspense } from 'react';
import { config } from '@fortawesome/fontawesome-svg-core';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';

import { Layout } from '@/components/app';
import { effTheme } from '@/components/ui/Theme';

import type { AppSeasonState } from './lib/cached-data';

config.autoAddCss = false;

export default function Providers({
	children,
	appSeasonState
}: PropsWithChildren<{ appSeasonState: AppSeasonState }>) {
	// Root Suspense around the Layout tree is load-bearing: dynamic / fallback-shell
	// routes (e.g. /_not-found, the driver dialog routes that have no
	// generateStaticParams) defer layout-level data here. Without it their prerender
	// fails with "uncached data accessed outside of <Suspense>". A Suspense boundary
	// does not force dynamic — static routes still render their content into the shell.
	return (
		<AppRouterCacheProvider options={{ enableCssLayer: true }}>
			<ThemeProvider theme={effTheme}>
				<CssBaseline />
				<Suspense>
					<Layout appSeasonState={appSeasonState}>{children}</Layout>
				</Suspense>
			</ThemeProvider>
		</AppRouterCacheProvider>
	);
}
