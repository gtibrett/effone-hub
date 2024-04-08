import {useQuery} from '@apollo/client';
import {SeasonsQuery} from '@effonehub/components';
import {Season} from '@gtibrett/effone-hub-graph-api';
import {Backdrop} from '@mui/material';
import {createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useContext, useEffect, useState} from 'react';
import {ErrorCard} from './ErrorBoundary';

type AppStateType = {
	currentSeason: number;
	seasonToShow: number;
	lastSeason: number;
	ready: boolean;
};

type SetAppStateType = Dispatch<SetStateAction<AppStateType>>;

const BLANK_STATE: AppStateType = {
	currentSeason: 0,
	seasonToShow:  0,
	lastSeason:    0,
	ready:         false
};

const Context = createContext<[AppStateType, SetAppStateType]>([
	BLANK_STATE, () => null
]);

const AppStateProvider: FC<PropsWithChildren> = ({children}) => {
	const [state, setState]      = useState<AppStateType>(BLANK_STATE);
	const {data, loading, error} = useQuery<{ seasons: Season[] }>(SeasonsQuery);
	
	useEffect(() => {
		if (!state.ready && !loading && data) {
			const {seasons} = data;
			
			setState({
				currentSeason: Math.max(...seasons.filter(s => !s.ended).map(s => s.year)),
				seasonToShow:  Math.max(...seasons.filter(s => s.hasResults).map(s => s.year)),
				lastSeason:    Math.max(...seasons.filter(s => s.ended).map(s => s.year)),
				ready:         true
			});
		}
	}, [data, loading, state.ready]);
	
	if (!state || !state.ready || !state.currentSeason) {
		return <Backdrop open>{error ? <ErrorCard message="Could not connect to the data API"/> : null}</Backdrop>;
	}
	
	return <Context.Provider value={[state, setState]}>{children}</Context.Provider>;
};

export default AppStateProvider;

/* Hooks */
export const useAppState = (): [AppStateType, SetAppStateType] => {
	return useContext(Context);
};