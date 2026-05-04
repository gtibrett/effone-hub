'use client';

import {ApolloClient, gql, HttpLink, InMemoryCache} from '@apollo/client';
import {ApolloCache} from '@apollo/client/cache/core/cache';
import {NormalizedCacheObject} from '@apollo/client/cache/inmemory/types';
import {CachePersistor, LocalStorageWrapper} from 'apollo3-cache-persist';
import {useEffect, useState} from 'react';

const cache               = new InMemoryCache();
export const apolloClient = new ApolloClient({
	link: new HttpLink({uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URL}),
	cache
});

const LAST_RACE_ID_KEY = 'last-race-id';
const lastRaceQuery    = gql`
	#graphql
	query lastRaceQuery {
		races (orderBy: [YEAR_DESC, ROUND_DESC], first: 1) {
			nodes {
				rowId
			}
		}
	}`;

type ApolloState = {
	client: ApolloClient<any>;
	ready: boolean;
	error?: any;
}

function setupApollo() {
	return new Promise<{
		cache: ApolloCache<NormalizedCacheObject>,
		persistor: CachePersistor<any>
	}>((resolve, reject) => {
		apolloClient.query({query: lastRaceQuery})
		            .then(result => result.data.races.nodes.length ? result.data.races.nodes[0].rowId : 0)
		            .then(lastRaceId => {
			      const lastRaceIdStr     = String(lastRaceId);
			      const persistor         = new CachePersistor({
				      cache,
				      storage:    new LocalStorageWrapper(window.localStorage),
				      maxSize:    4_000_000, // ~4MB; localStorage caps around 5-10MB and we'd rather pause than throw
				      trigger:    'write',
				      debounce:   500
			      });
			      const currentLastRaceId = window.localStorage.getItem(LAST_RACE_ID_KEY);

			      if (currentLastRaceId === lastRaceIdStr) {
				      persistor.restore()
				               .then(() => resolve({cache, persistor}));
			      } else {
				      persistor.purge()
				               .then(() => window.localStorage.setItem(LAST_RACE_ID_KEY, lastRaceIdStr))
				               .then(() => resolve({cache, persistor}));
			      }
		      })
		            .catch(error => reject(error));
	});
}

export default function useApolloClient(): ApolloState {
	const [persisted, setPersisted] = useState<boolean>(false);
	const [error, setError]         = useState<any>();
	
	useEffect(() => {
		if (!persisted) {
			setupApollo()
				.then(() => {
					setPersisted(true);
				})
				.catch(error => {
					setError(error);
					setPersisted(false);
				});
		}
		
	}, [persisted]);
	
	return {client: apolloClient, ready: persisted, error};
}