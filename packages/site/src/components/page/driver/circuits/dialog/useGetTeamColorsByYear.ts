import { useCallback } from 'react';

import { useGetTeamColor } from '@/hooks';

import type { CircuitDialogData } from './types';

type ColorsByYear = {
	[year: number]: string;
};

export default function useGetTeamColorsByYear() {
	const getTeamColor = useGetTeamColor();

	return useCallback(
		(
			seasonEntrantDrivers: CircuitDialogData['driver']['seasonEntrantDrivers']
		): ColorsByYear => {
			return (seasonEntrantDrivers || [])
				.map(({ year, constructor: c }) => ({
					year: year as number,
					color: getTeamColor(c?.colors)
				}))
				.reduce<ColorsByYear>((colors, { year, color }) => {
					colors[year] = color;
					return colors;
				}, {});
		},
		[getTeamColor]
	);
}
