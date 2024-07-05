import {Circuit, Race} from '@/gql/graphql';
import {GeoMapEventHandler} from '@nivo/geo';
import {useRouter} from 'next/navigation';
import {useCallback} from 'react';
import {Point} from './types';

type RaceData = Pick<Race, 'name' | 'round'> & Pick<Circuit, 'lat' | 'lng'> & { hasResults: boolean };

export default function useMapSeasonRacesToMapPoints() {
	const router = useRouter();
	
	return useCallback((season: string | number, races: (RaceData)[]): { points: Point[], onClick: GeoMapEventHandler } => {
		let foundNext         = false;
		const points: Point[] = [];
		
		races.forEach(({lng, lat, ...race}) => {
			if (lng && lat) {
				const next = (!race.hasResults && !foundNext);
				points.push({
					// @ts-ignore
					id: race.round,
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
				router.push(`/seasons/${season}/${feature.properties.round}`);
			}
		};
		
		return {points, onClick};
	}, [router]);
}