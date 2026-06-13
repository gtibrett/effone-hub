'use client';

import type { PropsWithChildren } from 'react';
import { config } from '@fortawesome/fontawesome-svg-core';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';

import { Layout } from '@/components/app';
import { effTheme } from '@/components/ui/Theme';

import ApolloWrapper from './ApolloWrapper';
import type { AppSeasonState } from './lib/cached-data';

config.autoAddCss = false;

export default function Providers({
	children,
	appSeasonState
}: PropsWithChildren<{ appSeasonState: AppSeasonState }>) {
	// Wall-clock reads are isolated in their own narrow boundaries (race-weekend
	// countdown) or run post-hydration in client components, so the Layout tree no
	// longer needs a broad Suspense wrapper here — keeping the static shell large.
	return (
		<AppRouterCacheProvider options={{ enableCssLayer: true }}>
			<ApolloWrapper>
				<ThemeProvider theme={effTheme}>
					<CssBaseline />
					<Layout appSeasonState={appSeasonState}>{children}</Layout>
				</ThemeProvider>
			</ApolloWrapper>
		</AppRouterCacheProvider>
	);
}
