import {ToggleButton, ToggleButtonGroup} from '@mui/material';
import {Dispatch, SetStateAction, SyntheticEvent, useCallback} from 'react';
import {ChartSwitcherChart} from './types';

type ChartSwitcherToggleProps = {
	charts: ChartSwitcherChart[];
	active: string | number;
	setActive: Dispatch<SetStateAction<string | number>>;
};

export default function ChartSwitcherToggle({charts, active, setActive}: ChartSwitcherToggleProps) {
	const handleActiveChange = useCallback((event: SyntheticEvent<HTMLElement>, newMode: string | number) => {
		event.currentTarget.blur();
		setActive(newMode);
		return false;
	}, [setActive]);
	
	return (
		<ToggleButtonGroup size="small" value={active} onChange={handleActiveChange} exclusive>
			{charts.map(({id, label}) => <ToggleButton key={id} value={id}>{label}</ToggleButton>)}
		</ToggleButtonGroup>
	);
}