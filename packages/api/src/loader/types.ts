import {Model} from 'sequelize';
import {MakeNullishOptional} from 'sequelize/types/utils';

export type PrimaryKey<T> = keyof T;
export type PrimaryKeys<T> = PrimaryKey<T> | (PrimaryKey<T>)[];

export type ModelLikeRow<T extends Model> = MakeNullishOptional<T["_creationAttributes"]>