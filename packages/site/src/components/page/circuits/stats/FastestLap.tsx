import {StatCard} from '@/components/app';
import {getTimeStringFromDate} from '@/helpers';
import {CircuitDataProps} from '@/hooks/data';
import {Maybe} from '@/gql/graphql';

export default function FastestLap({data, loading}: CircuitDataProps) {
	const fastestLaps: Map<string, Maybe<number>> = new Map<string, Maybe<number>>(
		(data?.circuit.history?.nodes || [])
			.filter(r => r.fastestLaps.nodes.length)
			.map(r => r.fastestLaps.nodes[0])
			.map(({timeMillis, driverId}): [string, number] => [driverId ?? '', timeMillis ?? Number.POSITIVE_INFINITY])
	);
	
	return <StatCard data={fastestLaps} label="Fastest Lap" format={(data) => getTimeStringFromDate(new Date(data.value))} loading={loading} size="small"/>;
}