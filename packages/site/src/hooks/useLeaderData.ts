import {DataWithValue} from '@/components/app';

type StatData<T extends DataWithValue = DataWithValue> = Map<number, T>;

export default function useLeaderData<T extends DataWithValue>(data: StatData<T>) {
	return Array.from(data.entries()).reduce((a: [number, T], b: [number, T]) => b[1].value > a[1].value ? b : a, [-1, {value: -1} as T]);
}

