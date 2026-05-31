import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { GeoMapEventHandler } from '@nivo/geo';

import { Circuit, Race } from '@/gql/graphql';

import { Point } from './types';

type RaceData = Pick<Race, 'officialName' | 'round'> &
	Pick<Circuit, 'latitude' | 'longitude'> & { hasResults: boolean };

export default function useMapSeasonRacesToMapPoints() {
	const router = useRouter();

	return useCallback(
		(
			season: string | number,
			races: RaceData[]
		): { points: Point[]; onClick: GeoMapEventHandler } => {
			let foundNext = false;
			const points: Point[] = [];

			races.forEach(({ longitude, latitude, ...race }) => {
				if (longitude && latitude) {
					const next = !race.hasResults && !foundNext;
					points.push({
						// @ts-ignore
						id: race.round,
						name: race.officialName || '',
						lng: Number(longitude),
						lat: Number(latitude),
						properties: {
							...race,
							next
						}
					});
				}

				if (!race.hasResults) {
					foundNext = true;
				}
			});

			const onClick: GeoMapEventHandler = feature => {
				if (feature?.geometry?.type === 'Point') {
					router.push(`/${season}/${feature.properties.round}`);
				}
			};

			return { points, onClick };
		},
		[router]
	);
}
