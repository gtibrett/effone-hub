import {Backdrop} from '@mui/material';
import {createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useContext, useEffect, useState} from 'react';
import {Season} from '@gtibrett/effone-hub-graph-api';
import useApolloClient from '../useApolloClient';
import {SeasonsQuery} from '../SeasonMenu';

type AppStateType = {
	season: number;
	currentSeason: number;
	ready: boolean;
};

type SetAppStateType = Dispatch<SetStateAction<AppStateType>>;

const BLANK_STATE: AppStateType = {
	season:        0,
	currentSeason: 0,
	ready:         false
};

const Context = createContext<[AppStateType, SetAppStateType]>([
	BLANK_STATE, () => null
]);

const AppStateProvider: FC<PropsWithChildren> = ({children}) => {
	const apolloClient      = useApolloClient();
	const [state, setState] = useState<AppStateType>(BLANK_STATE);
	
	useEffect(() => {
		apolloClient.query<{ seasons: Season[] }>({query: SeasonsQuery})
		            .then(({data}) => {
			            const {seasons} = data;
			            
			            return {
				            season:        Math.max(...seasons.map(s => s.year)),
				            currentSeason: Math.max(...seasons.map(s => s.year)),
				            ready:         true
			            };
		            })
		            .then(s => setState(s));
	}, [apolloClient, setState]);
	
	if (!state || !state.ready || !state.season) {
		return <Backdrop open/>;
	}
	
	return <Context.Provider value={[state, setState]}>{children}</Context.Provider>;
};

export default AppStateProvider;

/* Hooks */
export const useAppState = (): [AppStateType, SetAppStateType] => {
	return useContext(Context);
};