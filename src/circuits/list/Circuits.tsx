import {useAppState} from '@effonehub/app';
import {Page} from '@effonehub/ui-components';
import {setPageTitle} from '@gtibrett/mui-additions';
import {Card, CardContent} from '@mui/material';
import {useState} from 'react';
import CircuitsFilters from './CircuitsFilters';
import CircuitsList from './CircuitsList';
import {CircuitsListFilters} from './types';
import useCircuitsList from './useCircuitsList';

export default function Circuits() {
	setPageTitle('Circuits');
	
	const [{season: currentSeason}] = useAppState();
	const [filters, setFilters]     = useState<CircuitsListFilters>({
		season: currentSeason,
		search: ''
	});
	const {data, loading}           = useCircuitsList(filters);
	
	return (
		<Page title="Circuits">
			<Card>
				<CircuitsFilters filters={filters} setFilters={setFilters}/>
				<CardContent>
					<CircuitsList loading={loading} circuits={data}/>
				</CardContent>
			</Card>
		</Page>
	);
}