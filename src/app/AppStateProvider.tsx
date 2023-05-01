import {Responses} from '@gtibrett/effone-hub-api';
import {Backdrop} from '@mui/material';
import axios from 'axios';
import {createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useContext, useEffect, useState} from 'react';
import {getAPIUrl} from '../api/Ergast';

type AppStateType = {
	season: number;
};

type SetAppStateType = (newState: AppStateType) => void;

const BLANK_STATE = {season: (new Date()).getFullYear() - 1};

const initializeState = (): Promise<AppStateType> => {
	return new Promise(async (resolve, reject) => {
		const storedAppState = localStorage.getItem('app-state');
		if (storedAppState !== null) {
			resolve(JSON.parse(storedAppState));
		}
		
		axios.get<Responses.SeasonResponse>(getAPIUrl('/seasons.json'), {params: {limit: 100}})
		     .then(response => response.data.MRData?.SeasonTable?.Seasons || [])
		     .then((seasons) => {
			     resolve({
				     season: Math.max(...seasons.map(s => Number(s.season)))
			     });
		     })
		     .catch(err => reject(err));
	});
};

const Context = createContext<[AppStateType, Dispatch<SetStateAction<AppStateType>>]>([
	BLANK_STATE, () => null
]);

const AppStateProvider: FC<PropsWithChildren> = ({children}) => {
	const [state, setState] = useState<AppStateType>(BLANK_STATE);
	
	useEffect(() => {
		if (state) {
			localStorage.setItem('app-state', JSON.stringify(state));
		}
	}, [state]);
	
	useEffect(() => {
		initializeState().then(s => setState(s));
	}, []);
	
	if (!state || !state.season) {
		return <Backdrop open/>;
	}
	
	return <Context.Provider value={[state, setState]}>{children}</Context.Provider>;
};

export default AppStateProvider;

/* Hooks */
export const useAppState = (): [AppStateType, SetAppStateType] => {
	return useContext(Context);
};