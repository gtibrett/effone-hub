import { StatCard } from '@/components/app';
import { Maybe } from '@/gql/graphql';
import { getTimeStringFromDate } from '@/helpers';
import { CircuitDataProps } from '@/hooks/data';

export default function FastestLap({ data, loading }: CircuitDataProps) {
	const fastestLaps: Map<string, Maybe<number>> = new Map<string, Maybe<number>>(
		(data?.circuit.history || [])
			.filter(r => r.fastestLaps.length)
			.map(r => r.fastestLaps[0])
			.map(({ milliseconds, driverId }): [string, number] => [
				driverId ?? '',
				milliseconds ?? Number.POSITIVE_INFINITY
			])
	);

	return (
		<StatCard
			data={fastestLaps}
			label="Fastest Lap"
			format={data => getTimeStringFromDate(new Date(data.value))}
			loading={loading}
			size="small"
		/>
	);
}
