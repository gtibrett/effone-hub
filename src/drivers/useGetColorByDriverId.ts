import {Result} from '@gtibrett/effone-hub-api';
import useGetColorByConstructorId from '../constructors/useGetColorByConstructorId';
import {DriverId} from './DriverProvider';

export default function useGetColorByDriverId() {
	const getColorByConstructorId = useGetColorByConstructorId();
	
	return (driverId: DriverId, results: Result[]) => {
		const result = results.find(r => r.Driver?.driverId === driverId);
		if (driverId && result) {
			return getColorByConstructorId(result.Constructor?.constructorId);
		}
		
		return '#000';
	};
}