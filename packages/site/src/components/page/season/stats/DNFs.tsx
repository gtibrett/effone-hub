import type { SeasonDNFsData } from '@/app/lib/cached-data';
import { StatCard } from '@/components/app';

import type { SeasonStatProps } from './index';

type DNFsProps = SeasonStatProps & { data: SeasonDNFsData };

export default function DNFs({ size, data }: DNFsProps) {
	const leaders = new Map<string, number>();

	(data?.season?.racesByYear || []).forEach(r => {
		(r?.raceResults || []).forEach(rs => {
			if (rs?.driverId && rs?.reasonRetired != null) {
				leaders.set(rs.driverId, (leaders.get(rs.driverId) || 0) + 1);
			}
		});
	});

	return <StatCard size={size} loading={false} data={leaders} label="Most DNFs" />;
}
