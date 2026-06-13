'use client';

import { type PropsWithChildren, Suspense } from 'react';
import { UkraineButton } from '@gtibrett/mui-additions';
import { Box, Container } from '@mui/material';

import { SkipNav } from '@/components/ui';

import AppStateProvider from './AppStateProvider';
import ErrorBoundary from './ErrorBoundary';
import Footer from './footer/Footer';
import Header from './header/Header';

export default function Layout({ children }: PropsWithChildren) {
	// Cache Components: leaf `new Date()` reads ("is race in future?") must live inside Suspense.
	return (
		<AppStateProvider>
			<SkipNav selector="main" />

			<Box className="fixed inset-0 overflow-auto bg-background">
				<Suspense>
					<Header />
				</Suspense>

				<Container maxWidth="xl" component="main" className="relative py-4" tabIndex={0}>
					<ErrorBoundary>
						<Suspense>{children}</Suspense>
					</ErrorBoundary>
				</Container>

				<Suspense>
					<Footer />
				</Suspense>
				<UkraineButton />
			</Box>
		</AppStateProvider>
	);
}
