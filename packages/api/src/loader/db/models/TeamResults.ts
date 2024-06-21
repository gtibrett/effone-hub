import {DataTypes, InferAttributes, InferCreationAttributes, Model} from 'sequelize';
import Connection from '../connection';

export interface TeamResult extends Model<InferAttributes<TeamResult>, InferCreationAttributes<TeamResult>> {
	constructorResultsId: number,
	raceId: number,
	teamId: number,
	points?: number,
	status?: string
}

const TeamResults = Connection.define<TeamResult>('teamResults', {
	constructorResultsId: {type: DataTypes.INTEGER, allowNull: false, primaryKey: true},
	raceId:               {type: DataTypes.INTEGER, allowNull: false},
	teamId:               {type: DataTypes.INTEGER, allowNull: false},
	points:               {type: DataTypes.FLOAT, allowNull: true},
	status:               {type: DataTypes.STRING, allowNull: true}
});

export default TeamResults;