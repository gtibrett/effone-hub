import {useAppState} from '@/components/app';
import {ConstructorsFilters, ConstructorsList, ConstructorsListFilters, ConstructorsQuery} from '@/components/page/constructor';
import {TeamWithSeasons} from '@/components/page/constructor/useConstructorsList';
import {Page} from '@/components/ui';
import {apolloClient} from '@/useApolloClient';
import {setPageTitle} from '@gtibrett/mui-additions';
import {Card, CardContent} from '@mui/material';
import {useState} from 'react';

export default function Constructors({teams}: { teams: TeamWithSeasons[] }) {
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
				<CardContent>
					<ConstructorsList teams={teams} filters={filters}/>
				</CardContent>
			</Card>
		
		</Page>
	);
}

export async function getStaticProps() {
	const {data: {teams}} = await apolloClient.query<{ teams: TeamWithSeasons[] }>({query: ConstructorsQuery});
	
	return {
		props: {
			teams
		}
	};
}