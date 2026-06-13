'use client';

import type { PropsWithChildren } from 'react';
import { ApolloNextAppProvider } from '@apollo/client-integration-nextjs';

import { makeClient } from './lib/apollo-make-client';

export default function ApolloWrapper({ children }: PropsWithChildren) {
	return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
}
