import DriverAppearances from './DriverAppearances';
import DriverDNFs from './DriverDNFs';
import DriverInPoints from './DriverInPoints';
import DriverPodiums from './DriverPodiums';
import DriverWins from './DriverWins';
import type { DriverStatsData } from './useDriverStatsData';

export type DriverStatProps = {
	driverId: string;
	statsData: DriverStatsData['driver'] | null;
};

export default function Stats({ driverId, statsData }: DriverStatProps) {
	return (
		<>
			<DriverAppearances driverId={driverId} statsData={statsData} />
			<DriverWins driverId={driverId} statsData={statsData} />
			<DriverPodiums driverId={driverId} statsData={statsData} />
			<DriverInPoints driverId={driverId} statsData={statsData} />
			<DriverDNFs driverId={driverId} statsData={statsData} />
		</>
	);
}
