import {Backdrop} from '@mui/material';
import {createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useContext, useEffect, useState} from 'react';

type AppStateType = {
	season: number;
};

type SetAppStateType = (newState: AppStateType) => void;

const initializeState = (): AppStateType => {
	const storedAppState = localStorage.getItem('app-state');
	if (storedAppState !== null) {
		return JSON.parse(storedAppState);
	}
	
	return {
		season: (new Date()).getFullYear()-1
	};
};

const Context = createContext<[AppStateType, Dispatch<SetStateAction<AppStateType>>]>([
	initializeState(), () => null
]);

const AppStateProvider: FC<PropsWithChildren> = ({children}) => {
	const [state, setState] = useState<AppStateType>(initializeState());
	
	useEffect(() => {
		if (state) {
			localStorage.setItem('app-state', JSON.stringify(state));
		}
	}, [state]);
	
	if (!state) {
		return <Backdrop open/>;
	}
	
	return <Context.Provider value={[state, setState]}>{children}</Context.Provider>;
};

export default AppStateProvider;

/* Hooks */
export const useAppState = (): [AppStateType, SetAppStateType] => {
	return useContext(Context)
};