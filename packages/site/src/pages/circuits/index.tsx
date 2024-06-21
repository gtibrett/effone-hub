import {useAppState} from '@/components/app';
import {CircuitsFilters, CircuitsList, CircuitsListFilters, useCircuitsList} from '@/components/page/circuits';
import {Page} from '@/components/ui';
import {setPageTitle} from '@gtibrett/mui-additions';
import {Card, CardContent, Skeleton} from '@mui/material';
import {Suspense, useState} from 'react';

export default function Index() {
	setPageTitle('Circuits');
	
	const [{currentSeason}]     = useAppState();
	const [filters, setFilters] = useState<CircuitsListFilters>({
		season: currentSeason,
		search: ''
	});
	const {data}                = useCircuitsList(filters);
	
	return (
		<Page title="Circuits">
			<Suspense fallback={<Skeleton variant="rectangular" height="60vh"/>}>
				<Card>
					
					<CircuitsFilters filters={filters} setFilters={setFilters}/>
					<CardContent>
						<CircuitsList circuits={data}/>
					</CardContent>
				
				</Card>
			</Suspense>
		</Page>
	);
}