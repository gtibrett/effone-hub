import {useAppState} from '@/components/app';
import {ConstructorsFilters, ConstructorsList, ConstructorsListFilters} from '@/components/page/constructor';
import {Page} from '@/components/ui';
import {setPageTitle} from '@gtibrett/mui-additions';
import {Card, CardContent, Skeleton} from '@mui/material';
import {Suspense, useState} from 'react';

export default function Constructors() {
	setPageTitle('Constructors');
	
	const [{currentSeason}]     = useAppState();
	const [filters, setFilters] = useState<ConstructorsListFilters>({
		season: currentSeason,
		search: ''
	});
	
	return (
		<Page title="Constructors">
			<Card>
				<ConstructorsFilters filters={filters} setFilters={setFilters}/>
				<Suspense fallback={<Skeleton variant="rectangular" height="45vh"/>}>
					<CardContent>
						<ConstructorsList filters={filters}/>
					</CardContent>
				</Suspense>
			</Card>
		</Page>
	);
}