import {useQuery} from '@apollo/client';
import {useMemo} from 'react';
import SeasonsQuery from './SeasonsQuery';
import {Data} from './types';

export default function useSeasonsList() {
	const {loading, data} = useQuery<Data>(SeasonsQuery);
	
	return useMemo(() => {
		const seasons = data?.seasons?.filter(s => s.racesByYear[0].driverStandings.length) || [];
		
		return {data: seasons, loading};
	}, [data?.seasons, loading]);
}