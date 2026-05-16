import {useAppState} from '@/components/app';
import {useSlugs} from '@/helpers';

export default function useSeason() {
	const {season = 'current'} = useSlugs<{ season?: string }>();
	const [appState]           = useAppState();
	
	if (season === 'current' || !season) {
		return appState.currentSeason;
	} else {
		return Number(season);
	}
}