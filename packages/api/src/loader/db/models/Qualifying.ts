import {DataTypes, InferAttributes, InferCreationAttributes, Model} from 'sequelize';
import Connection from '../connection';

export interface Qualify extends Model<InferAttributes<Qualify>, InferCreationAttributes<Qualify>> {
	qualifyId: number,
	raceId: number,
	driverId: number,
	teamId: number,
	number: number,
	position?: number,
	q1?: string,
	q2?: string,
	q3?: string,
}

const Qualifying = Connection.define<Qualify>('qualifying', {
	qualifyId: {type: DataTypes.INTEGER, allowNull: false, primaryKey: true},
	raceId:    {type: DataTypes.INTEGER, allowNull: false},
	driverId:  {type: DataTypes.INTEGER, allowNull: false},
	teamId:    {type: DataTypes.INTEGER, allowNull: true},
	number:    {type: DataTypes.INTEGER, allowNull: false},
	position:  {type: DataTypes.INTEGER, allowNull: true},
	q1:        {type: DataTypes.STRING, allowNull: true},
	q2:        {type: DataTypes.STRING, allowNull: true},
	q3:        {type: DataTypes.STRING, allowNull: true}
});

export default Qualifying;