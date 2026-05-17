'use client';

import {SkipNav, UkraineButton} from '@/components/ui';
import {Container} from '@/components/ui';
import {PropsWithChildren, Suspense} from 'react';
import AppStateProvider from './AppStateProvider';
import ErrorBoundary from './ErrorBoundary';
import Footer from './footer/Footer';
import Header from './header/Header';

export default function Layout({children}: PropsWithChildren) {
	// Cache Components requires non-deterministic values like `new Date()` (used
	// throughout the leaf components for "is this race in the future?" checks)
	// to be inside a Suspense boundary. Wrap the route children + every other
	// dynamic surface (Header has menus that read current season; Footer is
	// static but cheap to wrap) so the prerender accepts them.
	return (
		<AppStateProvider>
			<SkipNav selector="main"/>

			<div className="fixed inset-0 overflow-auto bg-background">
				<Suspense>
					<Header/>
				</Suspense>

				<Container maxWidth="xl" component="main" className="relative py-4" tabIndex={0}>
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
			</div>
		</AppStateProvider>
	);
}
