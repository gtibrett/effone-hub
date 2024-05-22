import {useAppState} from '@effonehub/app';
import ConstructorsFilters from '@effonehub/constructor/list/ConstructorsFilters';
import ConstructorsList from '@effonehub/constructor/list/ConstructorsList';
import {ConstructorsListFilters} from '@effonehub/constructor/list/types';
import useConstructorsList from '@effonehub/constructor/list/useConstructorsList';
import {Page} from '@effonehub/ui-components';
import {setPageTitle} from '@gtibrett/mui-additions';
import {Card, CardContent} from '@mui/material';
import {useState} from 'react';

export default function Drivers() {
	setPageTitle('Constructors');
	
	const [{currentSeason}]     = useAppState();
	const [filters, setFilters] = useState<ConstructorsListFilters>({
		season: currentSeason,
		search: ''
	});
	const {data, loading}       = useConstructorsList(filters);
	
	return (
		<Page title="Constructors">
			{
				<Card>
					<ConstructorsFilters filters={filters} setFilters={setFilters}/>
					<CardContent>
						<ConstructorsList loading={loading} teams={data}/>
					</CardContent>
				</Card>
			}
		</Page>
	);
}