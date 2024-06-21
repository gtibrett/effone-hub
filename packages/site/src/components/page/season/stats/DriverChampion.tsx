import {StatCard, useAppState} from '@/components/app';
import {DriverId} from '@/types';
import {gql, useQuery} from '@apollo/client';

type Data = {
	driverStandingsBySeasons: {
		driverId: DriverId
	}[]
}

const query = gql`
	query seasonDriverChampionQuery($season: Int!) {
		driverStandingsBySeasons (condition: {year: $season}, orderBy: POSITION_ASC, first: 1) {
			driverId
		}
	}
`;

export default function DriverChampion({season}: { season: number }) {
	const {loading, data: {driverStandingsBySeasons = []} = {}} = useQuery<Data>(query, {variables: {season}});
	
	const [{currentSeason}] = useAppState();
	const champion          = new Map<number, number>();
	const label             = season === currentSeason ? 'Driver Leader' : 'Driver Champion';
	
	if (!driverStandingsBySeasons.length) {
		return null;
	}
	
	const {driverId} = driverStandingsBySeasons[0];
	if (!driverId) {
		return null;
	}
	
	champion.set(driverId, 1);
	
	return <StatCard label={label} loading={loading} data={champion} format={() => ''} noGrid cardProps={{sx: {'& > .MuiCardHeader-root': {px: 0, pb: 0}}}}/>;
}