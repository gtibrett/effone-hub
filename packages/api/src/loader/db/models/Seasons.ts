import {DataTypes, InferAttributes, InferCreationAttributes, Model} from 'sequelize';
import Connection from '../connection';

export interface Season extends Model<InferAttributes<Season>, InferCreationAttributes<Season>> {
	year: number,
	url: string
}

const Seasons = Connection.define<Season>('seasons', {
	year: {type: DataTypes.INTEGER, allowNull: false, primaryKey: true},
	url:  {type: DataTypes.STRING, allowNull: false, unique: true}
});

export default Seasons;