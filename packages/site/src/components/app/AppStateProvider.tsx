'use client';

import {
	createContext,
	type Dispatch,
	type FC,
	type PropsWithChildren,
	type SetStateAction,
	useContext,
	useState
} from 'react';

import type { AppSeasonState } from '@/app/lib/cached-data';

type AppStateType = {
	currentSeason: number;
	seasonToShow: number;
	lastSeason: number;
	ready: boolean;
};

type SetAppStateType = Dispatch<SetStateAction<AppStateType>>;

const BLANK_STATE: AppStateType = {
	currentSeason: 0,
	seasonToShow: 0,
	lastSeason: 0,
	ready: false
};

const Context = createContext<[AppStateType, SetAppStateType]>([BLANK_STATE, () => null]);

const AppStateProvider: FC<PropsWithChildren<{ initialState: AppSeasonState }>> = ({
	children,
	initialState
}) => {
	const [state, setState] = useState<AppStateType>({ ...initialState, ready: true });
	return <Context.Provider value={[state, setState]}>{children}</Context.Provider>;
};

export default AppStateProvider;

/* Hooks */
export const useAppState = (): [AppStateType, SetAppStateType] => {
	return useContext(Context);
};
