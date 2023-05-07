import {Race} from '@gtibrett/effone-hub-api';
import {GeoMapEventHandler} from '@nivo/geo';
import {useNavigate} from 'react-router';
import {Point} from './types';

export default function useMapSeasonRacesToMapPoints() {
	const navigate = useNavigate();
	
	return (season: string | number, races: Race[]): { points: Point[], onClick: GeoMapEventHandler } => {
		const points: Point[] = races.map((race) => ({
			'id':         race.round,
			'name':       race.raceName,
			long:         race.Circuit?.Location?.long,
			lat:          race.Circuit?.Location?.lat,
			'properties': {
				...race
			}
		}));
		
		const onClick: GeoMapEventHandler = (feature) => {
			if (feature?.geometry?.type === 'Point') {
				return navigate(`/race/${season}/${feature.properties.round}`);
			}
		};
		
		return {points, onClick};
	};
}