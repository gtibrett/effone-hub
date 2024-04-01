import {Dispatch, SetStateAction, useState} from 'react';
import {ActiveChart} from './types';

type useChartSwitcherTuple = [
	active: ActiveChart,
	setActive: Dispatch<SetStateAction<ActiveChart>>
]

export default function useChartSwitcher(): useChartSwitcherTuple {
	const [active, setActive] = useState<ActiveChart>('position');
	
	return [active, setActive];
}