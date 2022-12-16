import {AxiosResponse} from 'axios';
import {components} from './api/Ergast';

export const mapDriversStandings = (response: AxiosResponse<components['schemas']['DriverStandingsByYearResponse']>) => {
	if (response.data.MRData?.StandingsTable?.StandingsLists?.[0].DriverStandings) {
		return response?.data?.MRData?.StandingsTable?.StandingsLists?.[0].DriverStandings.map((standing) => ({
			...standing,
			id: standing.Driver?.driverId
		}));
	}
	
	return [];
};