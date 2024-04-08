import {useQuery} from '@apollo/client';
import SeasonsQuery from './SeasonsQuery';
import {Data} from './types';

export default function useSeasonsList() {
	return useQuery<Data>(SeasonsQuery);
}