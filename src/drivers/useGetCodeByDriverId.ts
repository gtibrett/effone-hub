import {DriverId, useDrivers} from './DriverProvider';

export default function useGetCodeByDriverId() {
	const drivers = useDrivers();
	return (driverId: DriverId) => {
		if (driverId && drivers[driverId]) {
			return drivers[driverId].code;
		}
		
		return '---';
	};
}