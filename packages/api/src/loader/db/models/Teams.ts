import {DataTypes, InferAttributes, InferCreationAttributes, Model} from 'sequelize';
import Connection from '../connection';

export interface Team extends Model<InferAttributes<Team>, InferCreationAttributes<Team>> {
	teamId: number,
	constructorRef: string,
	name: string,
	nationality?: string,
	url: string,
}

const Teams = Connection.define<Team>('teams', {
	teamId:         {type: DataTypes.INTEGER, allowNull: false, primaryKey: true},
	constructorRef: {type: DataTypes.STRING, allowNull: false, unique: true},
	name:           {type: DataTypes.STRING, allowNull: false},
	nationality:    {type: DataTypes.STRING, allowNull: true},
	url:            {type: DataTypes.STRING, allowNull: false, unique: true}
});

export default Teams;