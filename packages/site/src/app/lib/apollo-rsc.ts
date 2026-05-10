import {registerApolloClient} from '@apollo/experimental-nextjs-app-support';
import {makeClient} from './apollo-make-client';

export const {getClient} = registerApolloClient(makeClient);
