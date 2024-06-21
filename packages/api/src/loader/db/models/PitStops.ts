import {DataTypes, InferAttributes, InferCreationAttributes, Model} from 'sequelize';
import Connection from '../connection';

export interface PitStop extends Model<InferAttributes<PitStop>, InferCreationAttributes<PitStop>> {
	raceId: number,
	driverId: number,
	stop: number,
	lap: number,
	time: Date,
	duration?: number,
	milliseconds?: number,
}

const PitStops = Connection.define<PitStop>('pitStops', {
	raceId:       {type: DataTypes.INTEGER, allowNull: false, primaryKey: true},
	driverId:     {type: DataTypes.INTEGER, allowNull: false, primaryKey: true},
	stop:         {type: DataTypes.INTEGER, allowNull: false, primaryKey: true},
	lap:          {type: DataTypes.INTEGER, allowNull: false},
	time:         {type: DataTypes.TIME, allowNull: false},
	duration:     {type: DataTypes.STRING, allowNull: true},
	milliseconds: {type: DataTypes.INTEGER, allowNull: true}
	
});

export default PitStops;