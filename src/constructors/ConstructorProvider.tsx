import {Backdrop} from '@mui/material';
import {createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useContext, useEffect, useState} from 'react';
import {wikiSummary} from 'wikipedia';
import Caxios from '../api/Caxios';
import {getAPIUrl, getCanonicalId} from '../api/Ergast';
import {CanonicalId, getWiki} from '../api/wikipedia';
import {Constructor, Responses} from '@gtibrett/effone-hub-api';

const LOCAL_STORAGE_KEY = 'constructors';

export type ConstructorId = Constructor['constructorId'];
export type ConstructorWithBio = Constructor & {
	canonicalId?: CanonicalId,
	bio: wikiSummary | undefined,
	// TODO images: imageResult[] | undefined
};

type Constructors = {
	[id: string]: ConstructorWithBio
}

const initializeState = (): Constructors => {
	return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '{}');
};

const Context = createContext<[Constructors, Dispatch<SetStateAction<Constructors>>]>([
	initializeState(), () => null
]);

const ConstructorProvider: FC<PropsWithChildren> = ({children}) => {
	const [state, setState] = useState<Constructors>(initializeState());
	
	useEffect(() => {
		if (state) {
			localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
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

export default ConstructorProvider;

export const useConstructor = (id?: ConstructorId) => {
	const [constructors, setConstructors] = useContext(Context);
	
	useEffect(() => {
		if (id && !constructors[id]) {
			const dataUrl = getAPIUrl(`/constructors/${id}.json`);
			Caxios.get<Responses.ConstructorsResponse>(dataUrl)
			      .then(response => response.data)
			      .then(data => data.MRData?.ConstructorTable?.Constructors?.[0])
			      .then(async (constructor) => {
				      if (constructor) {
					      const canonicalId                    = getCanonicalId(constructor.url);
					      const [summary/*, images, infobox*/] = await getWiki(canonicalId).catch(error => {
						      console.log('Could not load driver bio', error);
						      return [undefined, undefined, undefined];
					      });
					
					      // TODO: pull infobox data?
					      //console.log(images, infobox);
					
					      setConstructors((cur) => ({
						      ...cur,
						      [id]: {
							      ...constructor,
							      canonicalId,
							      bio: summary
							      // TODO images: images
						      }
					      }));
				      }
			      });
		}
	}, [id, constructors, setConstructors]);
	
	return id ? constructors[id] : undefined;
};