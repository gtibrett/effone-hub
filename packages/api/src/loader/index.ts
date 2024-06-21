import {Express} from 'express';
import path from 'path';
import {initializeRelationships} from './db/relationships';
import {CircuitLoader, DriverLoader, DriverStandingsLoader, EverythingLoader, LapTimesLoader, PitStopsLoader, QualifyingLoader, RacesLoader, ResultsLoader, SeasonsLoader, SprintResultsLoader, StatusLoader, TeamResultsLoader, TeamsLoader, TeamStandingsLoader} from './loaders';
import {downloadHandler} from './utility/Download';
import {refreshAll} from './utility/MaterializedViews';

export function initializeLoader(app: Express) {
	initializeRelationships();
	
	app.get('/loader/circuits', (req, res) => CircuitLoader(res));
	app.get('/loader/drivers', (req, res) => DriverLoader(res));
	app.get('/loader/driverStandings', (req, res) => DriverStandingsLoader(res));
	app.get('/loader/lapTimes', (req, res) => LapTimesLoader(res));
	app.get('/loader/pitStops', (req, res) => PitStopsLoader(res));
	app.get('/loader/qualifying', (req, res) => QualifyingLoader(res));
	app.get('/loader/races', (req, res) => RacesLoader(res));
	app.get('/loader/results', (req, res) => ResultsLoader(res));
	app.get('/loader/seasons', (req, res) => SeasonsLoader(res));
	app.get('/loader/sprintResults', (req, res) => SprintResultsLoader(res));
	app.get('/loader/status', (req, res) => StatusLoader(res));
	app.get('/loader/teams', (req, res) => TeamsLoader(res));
	app.get('/loader/teamResults', (req, res) => TeamResultsLoader(res));
	app.get('/loader/teamStandings', (req, res) => TeamStandingsLoader(res));
	
	app.get('/loader/all', (req, res) => EverythingLoader(res));
	
	app.get('/loader/refresh/views', (req, res) => refreshAll(res));
	app.get('/loader/download', (req, res) => downloadHandler(res));
	
	app.get('/loader', (req, res) => {
		res.sendFile(path.join(__dirname, '/index.html'));
	});
}
