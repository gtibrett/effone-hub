import {AxiosResponse} from 'axios';

type Constructor = {
	'constructorId': string;
	'url': string;
	'name': string;
	'nationality': string;
}

type Driver = {
	'driverId': string;
	'permanentNumber': number;
	'code': string;
	'url': string;
	'givenName': string;
	'familyName': string;
	'dateOfBirth': string; //"1997-09-30",
	'nationality': string;
}

export const mapDriversStandings = (response: AxiosResponse) => {
	console.log(response);
	
	return response?.data?.MRData?.StandingsTable?.StandingsLists?.[0].DriverStandings.map((standing: any) => ({
		...standing,
		id: standing?.Driver?.driverId
	})) || [];
};


