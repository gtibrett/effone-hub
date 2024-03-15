import {Dispatch, SetStateAction, SyntheticEvent, useCallback, useState} from 'react';
import {ChartMode} from './types';

export type ChartSwitcherMode = {
	mode: ChartMode,
	setMode: Dispatch<SetStateAction<ChartMode>>
	handleMode: (event: SyntheticEvent<HTMLElement>, newMode: ChartMode) => boolean;
}

export default function useChartSwitcherMode(): ChartSwitcherMode {
	const [mode, setMode] = useState<ChartMode>('position');
	
	const handleMode = useCallback((event: SyntheticEvent<HTMLElement>, newMode: ChartMode) => {
		event.currentTarget.blur();
		setMode(newMode);
		return false;
	}, [setMode]);
	
	return {mode, setMode, handleMode};
}