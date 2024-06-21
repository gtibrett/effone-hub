import connection from "./connection";
import {Circuits, TeamResults, Teams, TeamStandings, Drivers, DriverStandings, LapTimes, PitStops, Qualifying, Races, Results, Seasons, SprintResults, Status} from "./models";
import CircuitDescriptions from './models/CircuitDescriptions';

// Relationships
export function initializeRelationships() {
	Circuits.hasMany(Races, {sourceKey: 'circuitId', foreignKey: 'circuitId'});
	Circuits.hasOne(CircuitDescriptions, {sourceKey: 'circuitId', foreignKey: 'circuitId'});
	
	CircuitDescriptions.belongsTo(Circuits, {targetKey: 'circuitId', foreignKey: 'circuitId'});
	
	TeamResults.belongsTo(Teams, {targetKey: 'teamId', foreignKey: 'teamId'});
	TeamResults.belongsTo(Races, {targetKey: 'raceId', foreignKey: 'raceId'});
	
	Teams.hasMany(TeamResults, {sourceKey: 'teamId', foreignKey: 'teamId'});
	Teams.hasMany(TeamStandings, {sourceKey: 'teamId', foreignKey: 'teamId'});
	Teams.hasMany(Qualifying, {sourceKey: 'teamId', foreignKey: 'teamId'});
	Teams.hasMany(Results, {sourceKey: 'teamId', foreignKey: 'teamId'});
	Teams.hasMany(SprintResults, {sourceKey: 'teamId', foreignKey: 'teamId'});
	
	TeamStandings.belongsTo(Teams, {targetKey: 'teamId', foreignKey: 'teamId'});
	TeamStandings.belongsTo(Races, {targetKey: 'raceId', foreignKey: 'raceId'});
	
	Drivers.hasMany(DriverStandings, {sourceKey: 'driverId', foreignKey: 'driverId'});
	Drivers.hasMany(Qualifying, {sourceKey: 'driverId', foreignKey: 'driverId'});
	Drivers.hasMany(Results, {sourceKey: 'driverId', foreignKey: 'driverId'});
	Drivers.hasMany(LapTimes, {sourceKey: 'driverId', foreignKey: 'driverId'});
	Drivers.hasMany(PitStops, {sourceKey: 'driverId', foreignKey: 'driverId'});
	
	DriverStandings.belongsTo(Drivers, {targetKey: 'driverId', foreignKey: 'driverId'});
	DriverStandings.belongsTo(Races, {targetKey: 'raceId', foreignKey: 'raceId'});
	
	LapTimes.belongsTo(Races, {targetKey: 'raceId', foreignKey: 'raceId'});
	LapTimes.belongsTo(Drivers, {targetKey: 'driverId', foreignKey: 'driverId'});
	
	PitStops.belongsTo(Races, {targetKey: 'raceId', foreignKey: 'raceId'});
	PitStops.belongsTo(Drivers, {targetKey: 'driverId', foreignKey: 'driverId'});
	
	Qualifying.belongsTo(Drivers, {targetKey: 'driverId', foreignKey: 'driverId'});
	Qualifying.belongsTo(Teams, {targetKey: 'teamId', foreignKey: 'teamId'});
	Qualifying.belongsTo(Races, {targetKey: 'raceId', foreignKey: 'raceId'});
	Qualifying.hasOne(Results, {
		as:         'qualifyingToResult',
		sourceKey:  'raceId',
		foreignKey: 'raceId',
		scope:      {
			driverId: connection.where(connection.col('qualifying.driverId'), '=', connection.col('qualifyingToResult.driverId'))
		}
	});
	
	
	Races.hasMany(Results, {sourceKey: 'raceId', foreignKey: 'raceId'});
	Races.hasMany(Qualifying, {sourceKey: 'raceId', foreignKey: 'raceId'});
	Races.hasMany(TeamResults, {sourceKey: 'raceId', foreignKey: 'raceId'});
	Races.hasMany(TeamStandings, {sourceKey: 'raceId', foreignKey: 'raceId'});
	Races.hasMany(DriverStandings, {sourceKey: 'raceId', foreignKey: 'raceId'});
	Races.hasMany(LapTimes, {sourceKey: 'raceId', foreignKey: 'raceId'});
	Races.hasMany(PitStops, {sourceKey: 'raceId', foreignKey: 'raceId'});
	Races.belongsTo(Circuits, {targetKey: 'circuitId', foreignKey: 'circuitId'});
	Races.belongsTo(Seasons, {targetKey: 'year', foreignKey: 'year'});
	
	Results.belongsTo(Races, {targetKey: 'raceId', foreignKey: 'raceId'});
	Results.belongsTo(Drivers, {targetKey: 'driverId', foreignKey: 'driverId'});
	Results.belongsTo(Teams, {targetKey: 'teamId', foreignKey: 'teamId'});
	Results.belongsTo(Status, {targetKey: 'statusId', foreignKey: 'statusId'});
	Results.hasOne(Qualifying, {
		as:         'resultToQualifying',
		sourceKey:  'raceId',
		foreignKey: 'raceId',
		scope:      {
			driverId: connection.where(connection.col('results.driverId'), '=', connection.col('resultToQualifying.driverId'))
		}
	});
	
	Seasons.hasMany(Races, {sourceKey: 'year', foreignKey: 'year'});
	
	SprintResults.hasOne(Races, {sourceKey: 'raceId', foreignKey: 'raceId'});
	SprintResults.hasOne(Drivers, {sourceKey: 'driverId', foreignKey: 'driverId'});
	SprintResults.belongsTo(Teams, {targetKey: 'teamId', foreignKey: 'teamId'});
	SprintResults.belongsTo(Status, {targetKey: 'statusId', foreignKey: 'statusId'});
	
	Status.hasMany(Results, {sourceKey: 'statusId', foreignKey: 'statusId'});
	Status.hasMany(SprintResults, {sourceKey: 'statusId', foreignKey: 'statusId'});
}