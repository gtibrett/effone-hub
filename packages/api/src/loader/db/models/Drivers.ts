import {DataTypes, InferAttributes, InferCreationAttributes, Model} from 'sequelize';
import Connection from '../connection';

export interface Driver extends Model<InferAttributes<Driver>, InferCreationAttributes<Driver>> {
	driverId: number,
	driverRef: string,
	number?: number,
	code?: string,
	forename: string,
	surname: string,
	dob?: Date,
	nationality?: string,
	url: string,
}

const Drivers = Connection.define<Driver>('drivers', {
	driverId:    {type: DataTypes.INTEGER, allowNull: false, primaryKey: true},
	driverRef:   {type: DataTypes.STRING, allowNull: false, unique: true},
	number:      {type: DataTypes.INTEGER, allowNull: true},
	code:        {type: DataTypes.STRING, allowNull: true},
	forename:    {type: DataTypes.STRING, allowNull: false},
	surname:     {type: DataTypes.STRING, allowNull: false},
	dob:         {type: DataTypes.DATE, allowNull: true},
	nationality: {type: DataTypes.STRING, allowNull: true},
	url:         {type: DataTypes.STRING, allowNull: false, unique: true}
});

export default Drivers;