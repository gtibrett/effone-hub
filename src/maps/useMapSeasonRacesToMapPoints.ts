import {Circuit, Race} from '@gtibrett/effone-hub-graph-api';
import {GeoMapEventHandler} from '@nivo/geo';
import {useNavigate} from 'react-router';
import {Point} from './types';

type RaceData = Pick<Race, 'name' | 'round'> & Pick<Circuit, 'lat' | 'lng'> & { hasResults: boolean };

export default function useMapSeasonRacesToMapPoints() {
	const navigate = useNavigate();
	let foundNext  = false;
	
	return (season: string | number, races: (RaceData)[]): { points: Point[], onClick: GeoMapEventHandler } => {
		const points: Point[] = [];
		races.forEach(({lng, lat, ...race}) => {
			if (lng && lat) {
				const next = (!race.hasResults && !foundNext);
				points.push({
					'id': race.round,
					...race,
					lng, lat,
					'properties': {
						...race,
						next
					}
				});
			}
			
			if (!race.hasResults) {
				foundNext = true;
			}
		});
		
		const onClick: GeoMapEventHandler = (feature) => {
			if (feature?.geometry?.type === 'Point') {
				return navigate(`/season/${season}/${feature.properties.round}`);
			}
		};
		
		return {points, onClick};
	};
}