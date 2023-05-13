import {Circuit, Constructor, Driver, ForConstructors, ForDrivers, Lap, PitStop, QualifyingResult, Race, Responses, Result, SeasonStanding, Standing} from '@gtibrett/effone-hub-api';
import {AxiosHeaders, AxiosResponse} from 'axios';
import {getAPIUrl, getCanonicalId, mapCircuits, mapConstructorHistory, mapConstructors, mapConstructorsStandings, mapDriverCareer, mapDrivers, mapDriversStandings, mapLaps, mapPastSeasons, mapPitStops, mapQualifying, mapRace, mapRaces, mapSchedule} from './Ergast';

function getMockResponse<T>(data: any): AxiosResponse<T> {
	const baseConfig: AxiosResponse['config']       = {headers: new AxiosHeaders()};
	const baseResponse: Omit<AxiosResponse, 'data'> = {status: 200, statusText: 'Ok', request: {}, headers: {}, config: baseConfig};
	
	return {
		...baseResponse,
		data: {
			MRData: {
				xmlns:  'fake',
				series: 'fake',
				url:    'fake',
				limit:  'fake',
				offset: 'fake',
				total:  'fake',
				...data
			}
		}
	} as AxiosResponse<T>;
}

describe('Ergast.ts', () => {
	test('getCanonicalId', async () => {
		expect(getCanonicalId('http://en.wikipedia.org/wiki/Lewis_Hamilton')).toBe('Lewis_Hamilton');
		expect(getCanonicalId('')).toBe(undefined);
		expect(getCanonicalId(undefined)).toBe(undefined);
	});
	
	test('getAPIUrl', async () => {
		expect(getAPIUrl('/foo')).toBe(`${process.env.REACT_APP_API_URL}/foo`);
	});
	
	test('mapSchedule', async () => {
		const getMock = (Races?: Race[]) => getMockResponse<Responses.ResultsResponse>({
			RaceTable: {
				season: 'fake',
				round:  'fake',
				Races
			}
		});
		
		expect(mapSchedule(getMock()).length).toBe(0);
		expect(mapSchedule(getMock([{} as Race])).length).toBe(1);
	});
	
	test('mapCircuits', async () => {
		const getMock = (Circuits?: Circuit[]) => getMockResponse<Responses.CircuitResponse>({
			CircuitTable: {
				Circuits
			}
		});
		
		expect(mapCircuits(getMock()).length).toBe(0);
		expect(mapCircuits(getMock([{} as Circuit])).length).toBe(1);
	});
	
	test('mapConstructors', async () => {
		const getMock = (Constructors?: Constructor[]) => getMockResponse<Responses.ConstructorsResponse>({
			ConstructorTable: {
				Constructors
			}
		});
		
		expect(mapConstructors(getMock()).length).toBe(0);
		expect(mapConstructors(getMock([{} as Constructor])).length).toBe(1);
	});
	
	test('mapDriversStandings', async () => {
		const getMock = (StandingsLists?: SeasonStanding<ForDrivers>[]) => getMockResponse<Responses.DriversStandingsResponse>({
			StandingsTable: {
				StandingsLists
			}
		});
		expect(mapDriversStandings(getMock()).length).toBe(0);
		expect(mapDriversStandings(getMock([
				{
					season:          '',
					round:           '20',
					DriverStandings: [
						{} as Standing
					]
				}
			])
		).length).toBe(1);
	});
	
	test('mapPastSeasons', async () => {
		const getMock = (StandingsLists?: SeasonStanding<ForDrivers>[]) => getMockResponse<Responses.DriversStandingsResponse>({
			StandingsTable: {
				StandingsLists
			}
		});
		expect(mapPastSeasons(getMock()).length).toBe(0);
		expect(mapPastSeasons(getMock([
				{
					season: '',
					round:  '20'
				} as SeasonStanding<ForDrivers>
			])
		).length).toBe(1);
	});
	
	test('mapDrivers', async () => {
		const getMock = (Drivers?: Driver[]) => getMockResponse<Responses.DriversResponse>({
			DriverTable: {
				Drivers
			}
		});
		
		expect(mapDrivers(getMock()).length).toBe(0);
		expect(mapDrivers(getMock([{} as Driver])).length).toBe(1);
	});
	
	test('mapDriverCareer', async () => {
		const getMock = (StandingsLists?: SeasonStanding<ForDrivers>[]) => getMockResponse<Responses.DriversStandingsResponse>({
			StandingsTable: {
				StandingsLists
			}
		});
		
		expect(mapDriverCareer(getMock()).length).toBe(0);
		expect(mapDriverCareer(getMock([{} as SeasonStanding<ForDrivers>])).length).toBe(1);
	});
	
	test('mapConstructorHistory', async () => {
		const getMock = (StandingsLists?: SeasonStanding<ForConstructors>[]) => getMockResponse<Responses.ConstructorStandingsResponse>({
			StandingsTable: {
				constructorId: "haas",
				StandingsLists
			}
		});
		
		const standing: Standing = {
			position:     "8",
			positionText: "8",
			points:       "29",
			wins:         "0",
			Constructor:  {
				constructorId: "haas",
				url:           "http://en.wikipedia.org/wiki/Haas_F1_Team",
				name:          "Haas F1 Team",
				nationality:   "American"
			}
		};
		
		expect(mapConstructorHistory(getMock()).length).toBe(0);
		expect(mapConstructorHistory(getMock([{season: '2016', round: '21',ConstructorStandings: [standing]} as SeasonStanding<ForConstructors>])).length).toBe(1);
	});
	
	test('mapRaces', async () => {
		const getMock = (Races?: Race[]) => getMockResponse<Responses.RacesResponse>({
			RaceTable: {
				Races
			}
		});
		
		expect(mapRaces(getMock()).length).toBe(0);
		expect(mapRaces(getMock([
			{
				season:   'fake',
				round:    'fake',
				url:      'fake',
				date:     'fake',
				raceName: 'fake',
				Circuit:  {} as Circuit,
				Results:  [{} as Result]
			} as Race
		])).length).toBe(1);
	});
	
	test('mapPitStops', async () => {
		const getMock = (Races?: Race[]) => getMockResponse<Responses.RacesResponse>({
			RaceTable: {
				Races
			}
		});
		
		expect(mapPitStops(getMock())?.length).toBe(0);
		expect(mapPitStops(getMock([{raceName: 'race', PitStops: [{} as PitStop]} as Race]))?.length).toBe(1);
	});
	
	test('mapRace', async () => {
		const getMock = (Races?: Race[]) => getMockResponse<Responses.RacesResponse>({
			RaceTable: {
				Races
			}
		});
		
		expect(mapRace(getMock())).toBe(undefined);
		expect(mapRace(getMock([{raceName: 'race', Results: [{} as Result]} as Race]))?.raceName).toBe('race');
	});
	
	test('mapQualifying', async () => {
		const getMock = (Races?: Race[]) => getMockResponse<Responses.RacesResponse>({
			RaceTable: {
				Races
			}
		});
		
		expect(mapQualifying(getMock()).length).toBe(0);
		expect(mapQualifying(getMock([{raceName: 'race', QualifyingResults: [{} as QualifyingResult]} as Race]))?.length).toBe(1);
	});
	
	test('mapLaps', async () => {
		const getMock = (Races?: Race[]) => getMockResponse<Responses.RacesResponse>({
			RaceTable: {
				Races
			}
		});
		
		expect(mapLaps(getMock()).length).toBe(0);
		expect(mapLaps(getMock([{raceName: 'race', Laps: [{} as Lap]} as Race]))?.length).toBe(1);
	});
	
	test('mapConstructorsStandings', async () => {
		const getMock = (StandingsLists?: SeasonStanding<ForConstructors>[]) => getMockResponse<Responses.ConstructorStandingsResponse>({
			StandingsTable: {
				StandingsLists
			}
		});
		expect(mapConstructorsStandings(getMock()).length).toBe(0);
		expect(mapConstructorsStandings((getMock([
				{
					season:               '',
					round:                '20',
					ConstructorStandings: [
						{} as Standing
					]
				}
			])
		)).length).toBe(1);
	});
	
});