import {DataTypes, InferAttributes, InferCreationAttributes, Model} from 'sequelize';
import Connection from '../connection';

export interface LapTime extends Model<InferAttributes<LapTime>, InferCreationAttributes<LapTime>> {
	raceId: number,
	driverId: number,
	lap: number,
	position?: number,
	time?: string,
	milliseconds?: number,
}

const LapTimes = Connection.define<LapTime>('lapTimes', {
	raceId:       {type: DataTypes.INTEGER, allowNull: false, primaryKey: true},
	driverId:     {type: DataTypes.INTEGER, allowNull: false, primaryKey: true},
	lap:          {type: DataTypes.INTEGER, allowNull: false, primaryKey: true},
	position:     {type: DataTypes.INTEGER, allowNull: true},
	time:         {type: DataTypes.STRING, allowNull: true},
	milliseconds: {type: DataTypes.INTEGER, allowNull: true}
});

export default LapTimes;