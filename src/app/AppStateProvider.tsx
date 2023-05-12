import {Responses} from '@gtibrett/effone-hub-api';
import {Backdrop} from '@mui/material';
import axios from 'axios';
import {createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useContext, useEffect, useState} from 'react';
import {purgeCaches} from '../api/Caxios';
import {getAPIUrl} from '../api/Ergast';

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

const initializeState = (): Promise<AppStateType> => {
	purgeCaches();
	
	return new Promise(async (resolve, reject) => {
		axios.get<Responses.SeasonResponse>(getAPIUrl('/seasons.json'), {params: {limit: 100}})
		     .then(response => response.data.MRData?.SeasonTable?.Seasons || [])
		     .then((seasons) => {
			     resolve({
				     season:        Math.max(...seasons.map(s => Number(s.season))),
				     currentSeason: Math.max(...seasons.map(s => Number(s.season))),
				     ready:         true
			     });
		     })
		     .catch(err => reject(err));
	});
};

const Context = createContext<[AppStateType, SetAppStateType]>([
	BLANK_STATE, () => null
]);

const AppStateProvider: FC<PropsWithChildren> = ({children}) => {
	const [state, setState] = useState<AppStateType>(BLANK_STATE);
	
	useEffect(() => {
		initializeState().then(s => setState(s));
	}, []);
	
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