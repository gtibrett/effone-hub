import {gql, useQuery} from '@apollo/client';
import {StatCard} from '@ui-components';
import {useAppState} from '../../app/AppStateProvider';
import {DriverId} from '../../driver';

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
	champion.set(driverId, 1);
	
	return <StatCard label={label} loading={loading} data={champion} format={() => ''}/>;
}