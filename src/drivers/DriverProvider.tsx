import {Driver as DriverT, Responses} from '@gtibrett/effone-hub-api';
import {Backdrop} from '@mui/material';
import {createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useContext, useEffect, useState} from 'react';
import {wikiSummary} from 'wikipedia';
import Caxios from '../api/Caxios';
import {getAPIUrl, getCanonicalId} from '../api/Ergast';
import {getWikiSummary} from '../api/wikipedia';

export type DriverId = DriverT['driverId'];
export type DriverWithBio = DriverT & {
	bio: wikiSummary | undefined
};

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

export const useDrivers = () => {
	const [drivers] = useContext(Context);
	return drivers;
};

export const useDriver = (id?: DriverId) => {
	const [drivers, setDrivers] = useContext(Context);
	
	useEffect(() => {
		if (id && !drivers[id]) {
			const dataUrl = getAPIUrl(`/drivers/${id}.json`);
			Caxios.get<Responses.DriversResponse>(dataUrl)
			      .then(response => response.data)
			      .then(data => data.MRData?.DriverTable?.Drivers?.[0])
			      .then((driver) => {
				      // Update profile
				      if (driver) {
					      const canonicalId = getCanonicalId(driver.url);
					      
					      setDrivers((cur) => ({
						      ...cur,
						      [id]: {
							      ...driver,
							      url: decodeURI(driver.url || ''),
							      canonicalId,
							      bio: undefined
						      }
					      }));
				      }
				      
				      return driver;
			      })
			      .then((driver) => {
				      if (driver) {
					      const canonicalId = getCanonicalId(driver.url);
					      
					      getWikiSummary(canonicalId)
						      .then((bio => {
							      setDrivers((cur) => ({
								      ...cur,
								      [id]: {
									      ...driver,
									      bio
								      }
							      }));
						      }))
						      .catch(error => {
							      console.log('Could not load driver bio', error);
							      setDrivers((cur) => ({
								      ...cur,
								      [id]: {
									      ...driver,
									      bio: undefined
								      }
							      }));
						      });
				      }
			      });
		}
	}, [id, drivers, setDrivers]);
	
	return id ? drivers[id] : undefined;
};