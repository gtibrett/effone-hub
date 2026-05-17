'use client';

import {useAppState} from '@/components/app';
import {ConstructorsFilters, ConstructorsList, ConstructorsListFilters} from '@/components/page/constructor';
import {Page, Card, CardContent, Skeleton} from '@/components/ui';
  
import {Suspense, useState} from 'react';

export default function ConstructorsContent() {
	const [{currentSeason}]     = useAppState();
	const [filters, setFilters] = useState<ConstructorsListFilters>({
		season: currentSeason,
		search: ''
	});

	return (
		<Page title="Constructors">
			<Card>
				<ConstructorsFilters filters={filters} setFilters={setFilters}/>
				<Suspense fallback={<Skeleton variant="rectangular" className="h-[45vh]"/>}>
					<CardContent>
						<ConstructorsList filters={filters}/>
					</CardContent>
				</Suspense>
			</Card>
		</Page>
	);
}
