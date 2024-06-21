import {DataTypes, InferAttributes, InferCreationAttributes, Model} from 'sequelize';
import Connection from '../connection';

export interface CircuitDescription extends Model<InferAttributes<CircuitDescription>, InferCreationAttributes<CircuitDescription>> {
	circuitId: number;
	description: string;
}

const CircuitDescriptions = Connection.define<CircuitDescription>('circuitDescriptions', {
	circuitId:   {type: DataTypes.INTEGER, allowNull: false, primaryKey: true},
	description: {type: DataTypes.TEXT, allowNull: true}
});

export default CircuitDescriptions;