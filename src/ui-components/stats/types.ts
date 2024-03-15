import {ReactNode} from 'react';

export type StatFormatter<T extends DataWithValue> = (data: T) => ReactNode;

export interface DataWithValue {
	value: number;
}