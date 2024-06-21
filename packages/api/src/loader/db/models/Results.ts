import {DataTypes, InferAttributes, InferCreationAttributes, Model} from 'sequelize';
import Connection from '../connection';

export interface Result extends Model<InferAttributes<Result>, InferCreationAttributes<Result>> {
	resultId: number,
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
	rank?: number,
	fastestLapTime?: number,
	fastestLapSpeed?: number,
	statusId: number
}

const Results = Connection.define<Result>('results', {
	resultId:        {type: DataTypes.INTEGER, allowNull: false, primaryKey: true},
	raceId:          {type: DataTypes.INTEGER, allowNull: false},
	driverId:        {type: DataTypes.INTEGER, allowNull: false},
	teamId:          {type: DataTypes.INTEGER, allowNull: true},
	number:          {type: DataTypes.INTEGER, allowNull: true},
	grid:            {type: DataTypes.INTEGER, allowNull: false},
	position:        {type: DataTypes.INTEGER, allowNull: true},
	positionText:    {type: DataTypes.STRING, allowNull: false},
	positionOrder:   {type: DataTypes.INTEGER, allowNull: false},
	points:          {type: DataTypes.FLOAT, allowNull: false},
	laps:            {type: DataTypes.INTEGER, allowNull: false},
	time:            {type: DataTypes.STRING, allowNull: true},
	milliseconds:    {type: DataTypes.INTEGER, allowNull: true},
	fastestLap:      {type: DataTypes.INTEGER, allowNull: true},
	rank:            {type: DataTypes.INTEGER, allowNull: true},
	fastestLapTime:  {type: DataTypes.STRING, allowNull: true},
	fastestLapSpeed: {type: DataTypes.STRING, allowNull: true},
	statusId:        {type: DataTypes.INTEGER, allowNull: false}
});

export default Results;