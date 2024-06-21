import {StatCardData} from './StatCard';
import {DataWithValue} from './types';

export default function convertGenericMapToDataWithValueMap<T extends StatCardData = DataWithValue, F extends DataWithValue = DataWithValue>(data: Map<number, T>): Map<number, F> {
	const dataWithValuesMap = new Map<number, F>();
	if (data.size) {
		// if data contains DataWithValues
		if ((Array.from(data.values())[0] as DataWithValue).value) {
			Array.from(data.entries()).forEach(([key, value]) => dataWithValuesMap.set(key, value as unknown as F));
		}
		// if data contains numbers
		else {
			Array.from(data.entries()).forEach(([key, value]) => dataWithValuesMap.set(key, {value: (value as number)} as F));
		}
	}
	
	return dataWithValuesMap;
}