import {registerApolloClient} from '@apollo/client-integration-nextjs';
import {makeClient} from './apollo-make-client';

export const {getClient} = registerApolloClient(makeClient);
