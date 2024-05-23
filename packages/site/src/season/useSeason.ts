import {useAppState} from '@effonehub/app';
import {useParams} from 'react-router';

export const useSeason = () => {
	const {season = 'current'} = useParams();
	const [appState]           = useAppState();
	
	if (season === 'current' || !season) {
		return appState.currentSeason;
	} else {
		return Number(season);
	}
};