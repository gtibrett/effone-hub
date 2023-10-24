import {ApolloClient, gql, InMemoryCache} from '@apollo/client';
import {ApolloCache} from '@apollo/client/cache/core/cache';
import {NormalizedCacheObject} from '@apollo/client/cache/inmemory/types';
import {CachePersistor, LocalStorageWrapper} from 'apollo3-cache-persist';
import {useEffect, useState} from 'react';

const cache  = new InMemoryCache();
const client = new ApolloClient({uri: process.env.REACT_APP_GRAPHQL_API_URL, cache});

const LAST_RACE_ID_KEY = 'last-race-id';
const lastRaceQuery    = gql`
	#graphql
	query lastRaceQuery {
		results (orderBy: RACE_ID_DESC, first: 1) {
			raceId
		}
	}`;

function setupApollo() {
	return new Promise<{ cache: ApolloCache<NormalizedCacheObject>, persistor: CachePersistor<any> }>((resolve, reject) => {
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
		      });
	});
}

export default function useApolloClient() {
	const [persisted, setPersisted] = useState<boolean>(false);
	
	useEffect(() => {
		if (!persisted) {
			setupApollo()
				.then(() => {
					setPersisted(true);
				});
		}
		
	}, [persisted, setPersisted]);
	
	return {client, ready: persisted};
}