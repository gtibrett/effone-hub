'use client';

import {ApolloNextAppProvider} from '@apollo/experimental-nextjs-app-support';
import {PropsWithChildren} from 'react';
import {makeClient} from './lib/apollo-make-client';

export default function ApolloWrapper({children}: PropsWithChildren) {
	return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
}
