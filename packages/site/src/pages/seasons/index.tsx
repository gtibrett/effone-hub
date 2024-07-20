import {SeasonData, SeasonsList} from '@/components/page/season';
import {Page} from '@/components/ui';
import {apolloClient} from '@/useApolloClient';
import {setPageTitle} from '@gtibrett/mui-additions';
import {Card} from '@mui/material';
import SeasonsQuery from '../../components/page/season/SeasonsQuery';

export default function Seasons({seasons}: { seasons: SeasonData[] }) {
	setPageTitle('Past Seasons');
	
	return (
		<Page title="Past Seasons">
			<Card>
				<SeasonsList seasons={seasons}/>
			</Card>
		</Page>
	);
}

export async function getStaticProps() {
	const {data: {seasons}} = await apolloClient.query<{ seasons: SeasonData[] }>({query: SeasonsQuery});
	
	return {
		props: {
			seasons
		}
	};
}