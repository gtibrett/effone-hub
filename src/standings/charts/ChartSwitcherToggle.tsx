import {ToggleButton, ToggleButtonGroup} from '@mui/material';
import {ChartSwitcherMode} from './useChartSwitcherMode';

export default function ChartSwitcherToggle({mode, handleMode}: Pick<ChartSwitcherMode, 'mode' | 'handleMode'>) {
	return (
		<ToggleButtonGroup size="small" value={mode} onChange={handleMode} exclusive>
			<ToggleButton value="position">Position</ToggleButton>
			<ToggleButton value="points">Points</ToggleButton>
		</ToggleButtonGroup>
	);
}