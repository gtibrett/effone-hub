import {DataTypes, InferAttributes, InferCreationAttributes, Model} from 'sequelize';
import Connection from '../connection';

export interface TeamStanding extends Model<InferAttributes<TeamStanding>, InferCreationAttributes<TeamStanding>> {
	constructorStandingsId: number,
	raceId: number,
	teamId: number,
	points: number,
	position?: number,
	positionText?: string,
	wins: number,
}

const TeamStandings = Connection.define<TeamStanding>('teamStandings', {
	constructorStandingsId: {type: DataTypes.INTEGER, allowNull: false, primaryKey: true},
	raceId:                 {type: DataTypes.INTEGER, allowNull: false},
	teamId:                 {type: DataTypes.INTEGER, allowNull: false},
	points:                 {type: DataTypes.FLOAT, allowNull: false},
	position:               {type: DataTypes.INTEGER, allowNull: true},
	positionText:           {type: DataTypes.STRING, allowNull: true},
	wins:                   {type: DataTypes.INTEGER, allowNull: false}
});

export default TeamStandings;