import {DataTypes, InferAttributes, InferCreationAttributes, Model} from 'sequelize';
import Connection from '../connection';

export interface SprintResult extends Model<InferAttributes<SprintResult>, InferCreationAttributes<SprintResult>> {
	sprintResultId: number,
	raceId: number,
	driverId: number,
	teamId: number,
	number?: number,
	grid: number,
	position?: number,
	positionText: string,
	positionOrder: number,
	points: number,
	laps: number,
	time?: number,
	milliseconds?: number,
	fastestLap?: number,
	fastestLapTime?: number,
	statusId: number
}

const SprintResults = Connection.define<SprintResult>('sprintResults', {
	sprintResultId: {type: DataTypes.INTEGER, allowNull: false, primaryKey: true},
	raceId:         {type: DataTypes.INTEGER, allowNull: false},
	driverId:       {type: DataTypes.INTEGER, allowNull: false},
	teamId:         {type: DataTypes.INTEGER, allowNull: false},
	number:         {type: DataTypes.INTEGER, allowNull: false},
	grid:           {type: DataTypes.INTEGER, allowNull: false},
	position:       {type: DataTypes.INTEGER, allowNull: true},
	positionText:   {type: DataTypes.STRING, allowNull: false},
	positionOrder:  {type: DataTypes.INTEGER, allowNull: false},
	points:         {type: DataTypes.FLOAT, allowNull: false},
	laps:           {type: DataTypes.INTEGER, allowNull: false},
	time:           {type: DataTypes.STRING, allowNull: true},
	milliseconds:   {type: DataTypes.INTEGER, allowNull: true},
	fastestLap:     {type: DataTypes.INTEGER, allowNull: true},
	fastestLapTime: {type: DataTypes.STRING, allowNull: true},
	statusId:       {type: DataTypes.INTEGER, allowNull: false}
});

export default SprintResults;