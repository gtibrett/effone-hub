'use client';

import {SkipNav} from '@/components/ui';
import {UkraineButton} from '@gtibrett/mui-additions';
import {Box, Container} from '@mui/material';
import {PropsWithChildren, Suspense} from 'react';
import AppStateProvider from './AppStateProvider';
import ErrorBoundary from './ErrorBoundary';
import Footer from './footer/Footer';
import Header from './header/Header';

// `color-scheme: light/dark` is set on :root in globals.css per the OS
// scheme — UA picks the right native scrollbar palette automatically.
export default function Layout({children}: PropsWithChildren) {
	// Cache Components requires non-deterministic values like `new Date()` (used
	// throughout the leaf components for "is this race in the future?" checks)
	// to be inside a Suspense boundary.
	return (
		<AppStateProvider>
			<SkipNav selector="main"/>

			<Box className="fixed inset-0 overflow-auto bg-background">
				<Suspense>
					<Header/>
				</Suspense>

				<Container maxWidth="xl" component="main" className="relative py-2" tabIndex={0}>
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