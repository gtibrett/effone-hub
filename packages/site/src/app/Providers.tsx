'use client';

import {Layout} from '@/components/app';
import {config} from '@fortawesome/fontawesome-svg-core';
import {PropsWithChildren, Suspense} from 'react';
import ApolloWrapper from './ApolloWrapper';

config.autoAddCss = false;

export default function Providers({children}: PropsWithChildren) {
	// Wrap the whole Layout tree in Suspense so Cache Components accepts the
	// `new Date()` reads scattered across the client components (race-weekend
	// "is this in the future?" checks, AppStateProvider's currentYear fallback,
	// etc.). Without this, /_not-found prerender fails.
	return (
		<ApolloWrapper>
			<Suspense>
				<Layout>{children}</Layout>
			</Suspense>
		</ApolloWrapper>
	);
}
