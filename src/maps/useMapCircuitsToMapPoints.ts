import {Circuit} from '@gtibrett/effone-hub-api';
import {GeoMapEventHandler} from '@nivo/geo';
import {useNavigate} from 'react-router';
import {Point} from './types';

export default function useMapCircuitsToMapPoints() {
	const navigate = useNavigate();
	
	return (circuits: Circuit[]): { points: Point[], onClick: GeoMapEventHandler } => {
		const points: Point[] = circuits.map((circuit) => ({
			'id':         circuit.circuitId,
			'name':       circuit.circuitName,
			long:         circuit.Location?.long,
			lat:          circuit.Location?.lat,
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