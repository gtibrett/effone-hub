import {Circuit} from '@/gql/graphql';
import {GeoMapEventHandler} from '@nivo/geo';
import {useRouter} from 'next/navigation';
import {useCallback} from 'react';
import {Point} from './types';

export default function useMapCircuitsToMapPoints() {
	const router = useRouter();
	
	return useCallback((circuits: Pick<Circuit, 'circuitId' | 'lat' | 'lng' | 'name'>[]): { points: Point[], onClick: GeoMapEventHandler } => {
		const points: Point[] = circuits
			.filter(c => c.lng && c.lat)
			.map((circuit) => ({
				'id':         circuit.circuitId,
				'name':       circuit.name || '',
				lng:          Number(circuit.lng),
				lat:          Number(circuit.lat),
				'properties': {
					...circuit
				}
			}));
		
		const onClick: GeoMapEventHandler = (feature) => {
			if (feature?.geometry?.type === 'Point') {
				router.push(`/circuits/${feature.id}`);
			}
		};
		
		return {points, onClick};
	}, [router]);
}