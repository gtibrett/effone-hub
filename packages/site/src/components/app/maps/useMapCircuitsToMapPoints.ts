import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { GeoMapEventHandler } from '@nivo/geo';

import { Circuit } from '@/gql/graphql';

import { Point } from './types';

export default function useMapCircuitsToMapPoints() {
	const router = useRouter();

	return useCallback(
		(
			circuits: Pick<Circuit, 'rowId' | 'latitude' | 'longitude' | 'fullName'>[]
		): { points: Point[]; onClick: GeoMapEventHandler } => {
			const points: Point[] = circuits
				.filter(c => c.longitude && c.latitude)
				.map(circuit => ({
					id: circuit.rowId,
					name: circuit.fullName || '',
					lng: Number(circuit.longitude),
					lat: Number(circuit.latitude),
					properties: {
						...circuit
					}
				}));

			const onClick: GeoMapEventHandler = feature => {
				if (feature?.geometry?.type === 'Point') {
					router.push(`/circuits/${feature.id}`);
				}
			};

			return { points, onClick };
		},
		[router]
	);
}
