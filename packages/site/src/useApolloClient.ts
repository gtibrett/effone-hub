import {ApolloClient, gql, InMemoryCache} from '@apollo/client';
import {ApolloCache} from '@apollo/client/cache/core/cache';
import {NormalizedCacheObject} from '@apollo/client/cache/inmemory/types';
import {CachePersistor, LocalStorageWrapper} from 'apollo3-cache-persist';
import {useEffect, useState} from 'react';

const cache  = new InMemoryCache();
export const client = new ApolloClient({uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URL, cache});

const LAST_RACE_ID_KEY = 'last-race-id';
const lastRaceQuery    = gql`
	#graphql
	query lastRaceQuery {
		results (orderBy: RACE_ID_DESC, first: 1) {
			raceId
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
		client.query({query: lastRaceQuery})
		      .then(result => result.data.results.length ? result.data.results[0].raceId : 0)
		      .then(lastRaceId => {
			      const persistor         = new CachePersistor({
				      cache,
				      storage: new LocalStorageWrapper(window.localStorage)
			      });
			      const currentLastRaceId = window.localStorage.getItem(LAST_RACE_ID_KEY);
			      
			      if (currentLastRaceId === lastRaceId) {
				      persistor.restore()
				               .then(() => resolve({cache, persistor}));
			      } else {
				      persistor.purge()
				               .then(() => window.localStorage.setItem(LAST_RACE_ID_KEY, lastRaceId))
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
	
	return {client, ready: persisted, error};
}