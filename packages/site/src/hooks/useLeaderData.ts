import {DataWithValue} from '@/components/app';

type StatData<T extends DataWithValue = DataWithValue> = Map<string, T>;

export default function useLeaderData<T extends DataWithValue>(data: StatData<T>) {
	return Array.from(data.entries()).reduce((a: [string, T], b: [string, T]) => b[1].value > a[1].value ? b : a, ['', {value: -1} as T]);
}

