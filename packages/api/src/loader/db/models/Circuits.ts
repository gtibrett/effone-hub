import {DataTypes, InferAttributes, InferCreationAttributes, Model} from 'sequelize';
import Connection from '../connection';

export interface Circuit extends Model<InferAttributes<Circuit>, InferCreationAttributes<Circuit>> {
	circuitId: number,
	circuitRef: string,
	name: string,
	location?: string,
	country?: string,
	lat?: number,
	lng?: number,
	alt?: number,
	url: string
}

const Circuits = Connection.define<Circuit>('circuits', {
	circuitId:  {type: DataTypes.INTEGER, allowNull: false, primaryKey: true},
	circuitRef: {type: DataTypes.STRING, allowNull: false, unique: true},
	name:       {type: DataTypes.STRING, allowNull: false},
	location:   {type: DataTypes.STRING, allowNull: true},
	country:    {type: DataTypes.STRING, allowNull: true},
	lat:        {type: DataTypes.FLOAT, allowNull: true},
	lng:        {type: DataTypes.FLOAT, allowNull: true},
	alt:        {type: DataTypes.INTEGER, allowNull: true},
	url:        {type: DataTypes.STRING, allowNull: false, unique: true}
});

export default Circuits;