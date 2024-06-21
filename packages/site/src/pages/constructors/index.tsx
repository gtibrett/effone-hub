import {useAppState} from '@/components/app';
import {ConstructorsFilters, ConstructorsList, ConstructorsListFilters, useConstructorsList} from '@/components/page/constructor';
import {Page} from '@/components/ui';
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