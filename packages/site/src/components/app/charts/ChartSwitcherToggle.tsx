'use client';

import {ToggleGroup, ToggleGroupItem} from '@/components/ui/shadcn/toggle-group';
import {Dispatch, SetStateAction} from 'react';
import {ChartSwitcherChart} from './types';

type ChartSwitcherToggleProps = {
	charts:    ChartSwitcherChart[];
	active:    string | number;
	setActive: Dispatch<SetStateAction<string | number>>;
};

export default function ChartSwitcherToggle({charts, active, setActive}: ChartSwitcherToggleProps) {
	// shadcn ToggleGroup wraps Radix ToggleGroup. Its `type="single" onValueChange`
	// fires whenever the selected item changes; in `exclusive` mode the value can
	// be `""` if the user deselects everything, so we ignore that branch to keep
	// parity with the MUI ToggleButtonGroup exclusive behaviour.
	return (
		<ToggleGroup
			type="single"
			size="sm"
			value={String(active)}
			onValueChange={(value) => {
				if (value) setActive(value);
			}}
		>
			{charts.map(({id, label}) => (
				<ToggleGroupItem key={id} value={String(id)}>{label}</ToggleGroupItem>
			))}
		</ToggleGroup>
	);
}
