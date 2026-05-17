'use client';

import {SkipNav, UkraineButton} from '@/components/ui';
import {useTheme} from '@/lib/theme';
import {Box, Container} from '@/components/ui';
import type {SxProps} from '@/lib/theme';
import {PropsWithChildren, Suspense} from 'react';
import AppStateProvider from './AppStateProvider';
import ErrorBoundary from './ErrorBoundary';
import Footer from './footer/Footer';
import Header from './header/Header';

export default function Layout({children}: PropsWithChildren) {
	const theme = useTheme();

	const sx: SxProps = {
		py:       2,
		position: 'relative'
	};

	// Cache Components requires non-deterministic values like `new Date()` (used
	// throughout the leaf components for "is this race in the future?" checks)
	// to be inside a Suspense boundary. Wrap the route children + every other
	// dynamic surface (Header has menus that read current season; Footer is
	// static but cheap to wrap) so the prerender accepts them.
	return (
		<AppStateProvider>
			<SkipNav selector="main"/>

			<Box sx={{position: 'fixed', overflow: 'auto', scrollbarColor: theme.palette.mode, top: 0, left: 0, right: 0, bottom: 0, background: theme.palette.background.default}}>
				<Suspense>
					<Header/>
				</Suspense>

				<Container maxWidth="xl" component="main" sx={sx} tabIndex={0}>
					<ErrorBoundary>
						<Suspense>
							{children}
						</Suspense>
					</ErrorBoundary>
				</Container>

				<Suspense>
					<Footer/>
				</Suspense>
				<UkraineButton/>
			</Box>
		</AppStateProvider>
	);
}