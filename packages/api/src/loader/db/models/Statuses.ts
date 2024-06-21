import {DataTypes, InferAttributes, InferCreationAttributes, Model} from 'sequelize';
import Connection from '../connection';

export interface Status extends Model<InferAttributes<Status>, InferCreationAttributes<Status>> {
	statusId: number;
	status: string;
}

const Statuses = Connection.define<Status>('status', {
	statusId: {type: DataTypes.INTEGER, allowNull: false, primaryKey: true},
	status:   {type: DataTypes.STRING, allowNull: false}
});

export default Statuses;