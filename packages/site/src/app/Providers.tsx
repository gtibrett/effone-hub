'use client';

import { type PropsWithChildren, Suspense } from 'react';
import { config } from '@fortawesome/fontawesome-svg-core';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';

import { Layout } from '@/components/app';
import { effTheme } from '@/components/ui/Theme';

import ApolloWrapper from './ApolloWrapper';

config.autoAddCss = false;

export default function Providers({ children }: PropsWithChildren) {
	// Wrap the whole Layout tree in Suspense so Cache Components accepts the
	// `new Date()` reads scattered across the client components (race-weekend
	// "is this in the future?" checks, AppStateProvider's currentYear fallback,
	// etc.). Without this, /_not-found prerender fails.
	return (
		<AppRouterCacheProvider options={{ enableCssLayer: true }}>
			<ApolloWrapper>
				<ThemeProvider theme={effTheme}>
					<CssBaseline />
					<Suspense>
						<Layout>{children}</Layout>
					</Suspense>
				</ThemeProvider>
			</ApolloWrapper>
		</AppRouterCacheProvider>
	);
}
