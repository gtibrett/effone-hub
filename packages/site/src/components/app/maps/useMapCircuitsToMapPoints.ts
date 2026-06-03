import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

import { Circuit } from '@/gql/graphql';

import { Point } from './types';
import type { MapPointEventHandler } from './useMapSeasonRacesToMapPoints';

export default function useMapCircuitsToMapPoints() {
	const router = useRouter();

	return useCallback(
		(
			circuits: Pick<Circuit, 'id' | 'latitude' | 'longitude' | 'fullName'>[]
		): { points: Point[]; onClick: MapPointEventHandler } => {
			const points: Point[] = circuits
				.filter(c => c.longitude && c.latitude)
				.map(circuit => ({
					id: circuit.id,
					name: circuit.fullName || '',
					lng: Number(circuit.longitude),
					lat: Number(circuit.latitude),
					properties: {
						...circuit
					}
				}));

			const onClick: MapPointEventHandler = point => {
				router.push(`/circuits/${point.id}`);
			};

			return { points, onClick };
		},
		[router]
	);
}
