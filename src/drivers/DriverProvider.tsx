import {Backdrop} from '@mui/material';
import {createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useContext, useEffect, useState} from 'react';
import {wikiSummary} from 'wikipedia';
import Caxios from '../api/Caxios';
import {getAPIUrl, getCanonicalId} from '../api/Ergast';
import {getDriverBio} from '../api/wikipedia';
import {Driver as DriverT, Responses} from '../types/ergast';

export type DriverId = DriverT['driverId'];
export type DriverWithBio = DriverT & { bio: wikiSummary };

type Drivers = {
	[id: string]: DriverWithBio
}

const initializeState = (): Drivers => {
	return JSON.parse(localStorage.getItem('drivers') || '{}');
};

const Context = createContext<[Drivers, Dispatch<SetStateAction<Drivers>>]>([
	initializeState(), () => null
]);

const DriverProvider: FC<PropsWithChildren> = ({children}) => {
	const [state, setState] = useState<Drivers>(initializeState());
	
	useEffect(() => {
		if (state) {
			localStorage.setItem('drivers', JSON.stringify(state));
		}
	}, [state]);
	
	if (!state) {
		return <Backdrop open/>;
	}
	
	return (
		<Context.Provider value={[state, setState]}>
			{children}
		</Context.Provider>
	);
};

export default DriverProvider;

export const useDriver = (id: DriverId) => {
	const [drivers, setDrivers] = useContext(Context);
	
	useEffect(() => {
		if (id && !drivers[id]) {
			const dataUrl = getAPIUrl(`/drivers/${id}.json`);
			Caxios.get<Responses['DriversResponse']>(dataUrl)
			      .then(response => response.data)
			      .then(data => data.MRData?.DriverTable?.Drivers?.[0])
			      .then(async (driver) => {
				      if (driver) {
					      const canonicalId = getCanonicalId(driver);
					      setDrivers({
						      ...drivers,
						      [id]: {
							      ...driver,
							      canonicalId,
							      bio: await getDriverBio(canonicalId)
						      }
					      });
				      }
			      });
		}
	}, [id, drivers]);
	
	return id ? drivers[id] : undefined;
};