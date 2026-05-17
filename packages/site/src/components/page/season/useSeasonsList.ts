import { useSuspenseQuery } from "@apollo/client/react";
import SeasonsQuery from './SeasonsQuery';
import {Data} from './types';

export default function useSeasonsList() {
	return useSuspenseQuery<Data>(SeasonsQuery);
}