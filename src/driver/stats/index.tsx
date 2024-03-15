import {DriverId} from '../types';
import DriverAppearances from './DriverAppearances';
import DriverDNFs from './DriverDNFs';
import DriverInPoints from './DriverInPoints';
import DriverPodiums from './DriverPodiums';
import DriverWins from './DriverWins';

export type DriverStatProps = {
	driverId: DriverId;
}

export default function Stats({driverId}: {
	driverId: DriverId
}) {
	return (
		<>
			<DriverAppearances driverId={driverId}/>
			<DriverWins driverId={driverId}/>
			<DriverPodiums driverId={driverId}/>
			<DriverInPoints driverId={driverId}/>
			<DriverDNFs driverId={driverId}/>
		</>
	);
}