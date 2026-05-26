import { useCallback } from 'react';

import { useGetTeamColor } from '@/hooks';

import { CircuitDialogData } from './types';

type ColorsByYear = {
	[year: number]: string;
};

export default function useGetTeamColorsByYear() {
	const getTeamColor = useGetTeamColor();

	return useCallback(
		(
			seasonEntrantDrivers: CircuitDialogData['driver']['seasonEntrantDrivers']
		): ColorsByYear => {
			return (seasonEntrantDrivers?.nodes || [])
				.map(({ year, constructor: c }) => ({
					year: year as number,
					color: getTeamColor(c?.colors)
				}))
				.reduce((colors, { year, color }) => ({ ...colors, [year]: color }), {});
		},
		[getTeamColor]
	);
}
