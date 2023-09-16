import {GeoMapEventHandler} from '@nivo/geo';
import {useNavigate} from 'react-router';
import {Circuit} from '@gtibrett/effone-hub-graph-api';
import {Point} from './types';

export default function useMapCircuitsToMapPoints() {
	const navigate = useNavigate();
	
	return (circuits: Pick<Circuit, 'circuitId' | 'lat' | 'lng' | 'name'>[]): { points: Point[], onClick: GeoMapEventHandler } => {
		const points: Point[] = circuits
			.filter(c => c.lng && c.lat)
			.map((circuit) => ({
				'id':         circuit.circuitId,
				'name':       circuit.name,
				lng:          Number(circuit.lng),
				lat:          Number(circuit.lat),
				'properties': {
					...circuit
				}
			}));
		
		const onClick: GeoMapEventHandler = (feature) => {
			if (feature?.geometry?.type === 'Point') {
				return navigate(`/circuit/${feature.id}`);
			}
		};
		
		return {points, onClick};
	};
}