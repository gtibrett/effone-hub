import {Circuit, Constructor, Driver, ForConstructors, ForDrivers, Lap, PitStop, QualifyingResult, Race, Responses, SeasonStanding, Standing} from '@gtibrett/effone-hub-api';
import {AxiosResponse} from 'axios';

export const getCanonicalId = (url: string | undefined) => {
	if (typeof url === 'undefined') {
		return undefined;
	}
	const urlParts    = url.split('/');
	const canonicalId = urlParts.pop();
	return canonicalId ? decodeURI(canonicalId) : undefined;
};

export function getAPIUrl(path: string) {
	return `${process.env.REACT_APP_API_URL}${path}`;
}

export const mapSchedule = (response: AxiosResponse<Responses.ResultsResponse>): Race[] => {
	return response.data.MRData.RaceTable.Races || [];
};

export const mapCircuits = (response: AxiosResponse<Responses.CircuitResponse>): Circuit[] => {
	return response.data.MRData.CircuitTable.Circuits || [];
};

export const mapConstructors = (response: AxiosResponse<Responses.ConstructorsResponse>): Constructor[] => {
	return response.data.MRData.ConstructorTable?.Constructors || [];
};

export const mapDriversStandings = (response: AxiosResponse<Responses.DriversStandingsResponse>): Standing[] => {
	return response.data.MRData.StandingsTable.StandingsLists?.[0].DriverStandings || [];
};

export const mapPastSeasons = (response: AxiosResponse<Responses.DriversStandingsResponse>): SeasonStanding<ForDrivers>[] => {
	return response.data.MRData.StandingsTable.StandingsLists || [];
};

export const mapDrivers = (response: AxiosResponse<Responses.DriversResponse>): Driver[] => {
	return response.data.MRData.DriverTable.Drivers || [];
};

export const mapDriverCareer = (response: AxiosResponse<Responses.DriversStandingsResponse>): SeasonStanding<ForDrivers>[] => {
	return response.data.MRData.StandingsTable.StandingsLists || [];
};

export const mapConstructorHistory = (response: AxiosResponse<Responses.ConstructorStandingsResponse>): SeasonStanding<ForConstructors>[] => {
	if (response.data.MRData.StandingsTable.StandingsLists?.[0]?.ConstructorStandings) {
		return response.data.MRData.StandingsTable.StandingsLists.map((season) => ({
			...season,
			ConstructorStandings: season.ConstructorStandings.map((standing) => ({
				...standing,
				Constructor: {
					...standing.Constructor,
					canonicalId: getCanonicalId(standing.Constructor.url)
				}
			}))
		}));
	}
	
	return [];
};

export const mapRace = (response: AxiosResponse<Responses.ResultsResponse>): Race | undefined => {
	if (response.data.MRData.RaceTable.Races?.[0].Results) {
		return {
			...response.data.MRData.RaceTable.Races?.[0],
			Results: response.data.MRData.RaceTable.Races?.[0].Results
		};
	}
	
	return undefined;
};

export const mapPitStops = (response: AxiosResponse<Responses.ResultsResponse>): PitStop[] | undefined => {
	if (response.data.MRData.RaceTable.Races?.[0].PitStops) {
		return response.data.MRData.RaceTable.Races?.[0].PitStops;
	}
	
	return [];
};

export const mapRaces = (response: AxiosResponse<Responses.ResultsResponse>): Race[] => {
	if (response.data.MRData.RaceTable.Races) {
		return response.data.MRData.RaceTable.Races;
	}
	
	return [];
};

export const mapQualifying = (response: AxiosResponse<Responses.ResultsResponse>): QualifyingResult[] => {
	return response.data.MRData.RaceTable.Races?.[0].QualifyingResults || [];
};

export const mapLaps = (response: AxiosResponse<Responses.ResultsResponse>): Lap[] => {
	return response.data.MRData.RaceTable.Races?.[0].Laps || [];
};

export const mapConstructorsStandings = (response: AxiosResponse<Responses.ConstructorStandingsResponse>): Standing[] => {
	if (response.data.MRData.StandingsTable?.StandingsLists?.[0].ConstructorStandings) {
		return response?.data?.MRData.StandingsTable?.StandingsLists?.[0].ConstructorStandings.map((standing) => ({
			...standing,
			id: standing.Constructor?.constructorId
		}));
	}
	
	return [];
};