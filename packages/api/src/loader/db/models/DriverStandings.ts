import {DataTypes, InferAttributes, InferCreationAttributes, Model} from 'sequelize';
import Connection from '../connection';

export interface DriverStanding extends Model<InferAttributes<DriverStanding>, InferCreationAttributes<DriverStanding>> {
	driverStandingsId: number,
	raceId: number,
	driverId: number,
	points: number,
	position?: number,
	positionText?: string,
	wins: number,
}

const DriverStandings = Connection.define<DriverStanding>('driverStandings', {
	driverStandingsId: {type: DataTypes.INTEGER, allowNull: false, primaryKey: true},
	raceId:            {type: DataTypes.INTEGER, allowNull: false},
	driverId:          {type: DataTypes.INTEGER, allowNull: false},
	points:            {type: DataTypes.FLOAT, allowNull: false},
	position:          {type: DataTypes.INTEGER, allowNull: true},
	positionText:      {type: DataTypes.STRING, allowNull: true},
	wins:              {type: DataTypes.INTEGER, allowNull: false}
});

export default DriverStandings;