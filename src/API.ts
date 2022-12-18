import {AxiosResponse} from 'axios';
import {APIResponse, components} from './api/Ergast';

export const mapSchedule = (response: AxiosResponse<APIResponse['ResultsByYearResponse']>) => {
	if (response.data.MRData?.RaceTable?.Races) {
		return response?.data?.MRData?.RaceTable?.Races;
	}
	
	return [];
};

export const mapDriversStandings = (response: AxiosResponse<APIResponse['DriverStandingsByYearResponse']>) => {
	if (response.data.MRData?.StandingsTable?.StandingsLists?.[0].DriverStandings) {
		return response?.data?.MRData?.StandingsTable?.StandingsLists?.[0].DriverStandings.map((standing) => ({
			...standing,
			id: standing.Driver?.driverId
		}));
	}
	
	return [];
};

export const mapConstructorsStandings = (response: AxiosResponse<components['schemas']['ConstructorStandingsByYearResponse']>) => {
	if (response.data.MRData?.StandingsTable?.StandingsLists?.[0].ConstructorStandings) {
		return response?.data?.MRData?.StandingsTable?.StandingsLists?.[0].ConstructorStandings.map((standing) => ({
			...standing,
			id: standing.Constructor?.constructorId
		}));
	}
	
	return [];
};