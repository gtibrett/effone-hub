import {DataTypes, InferAttributes, InferCreationAttributes, Model} from 'sequelize';
import Connection from '../connection';

export interface Race extends Model<InferAttributes<Race>, InferCreationAttributes<Race>> {
	raceId: number,
	year: number,
	round: number,
	circuitId: number,
	name: string,
	date: Date,
	time?: Date,
	url?: string,
	fp1_date?: Date,
	fp1_time?: Date,
	fp2_date?: Date,
	fp2_time?: Date,
	fp3_date?: Date,
	fp3_time?: Date,
	quali_date?: Date,
	quali_time?: Date,
	sprint_date?: Date,
	sprint_time?: Date
}

const Races = Connection.define<Race>('races', {
	raceId:      {type: DataTypes.INTEGER, allowNull: false, primaryKey: true},
	year:        {type: DataTypes.INTEGER, allowNull: false},
	round:       {type: DataTypes.INTEGER, allowNull: false},
	circuitId:   {type: DataTypes.INTEGER, allowNull: false},
	name:        {type: DataTypes.STRING, allowNull: false},
	date:        {type: DataTypes.DATE, allowNull: false},
	time:        {type: DataTypes.TIME, allowNull: true},
	url:         {type: DataTypes.STRING, allowNull: true},
	fp1_date:    {type: DataTypes.DATE, allowNull: true},
	fp1_time:    {type: DataTypes.TIME, allowNull: true},
	fp2_date:    {type: DataTypes.DATE, allowNull: true},
	fp2_time:    {type: DataTypes.TIME, allowNull: true},
	fp3_date:    {type: DataTypes.DATE, allowNull: true},
	fp3_time:    {type: DataTypes.TIME, allowNull: true},
	quali_date:  {type: DataTypes.DATE, allowNull: true},
	quali_time:  {type: DataTypes.TIME, allowNull: true},
	sprint_date: {type: DataTypes.DATE, allowNull: true},
	sprint_time: {type: DataTypes.TIME, allowNull: true}
});

export default Races;