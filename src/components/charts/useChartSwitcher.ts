import {Dispatch, SetStateAction, useState} from 'react';
import {ActiveChart} from './types';

type useChartSwitcherTuple = [
	active: ActiveChart,
	setActive: Dispatch<SetStateAction<ActiveChart>>
]

export default function useChartSwitcher(initial: ActiveChart = 'position'): useChartSwitcherTuple {
	const [active, setActive] = useState<ActiveChart>(initial);
	
	return [active, setActive];
}