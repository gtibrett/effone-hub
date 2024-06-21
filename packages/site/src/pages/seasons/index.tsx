import {SeasonsList, useSeasonsList} from '@/components/page/season';
import {Page} from '@/components/ui';
import {setPageTitle} from '@gtibrett/mui-additions';
import {Card} from '@mui/material';

export default function Seasons() {
	setPageTitle('Past Seasons');
	const {data} = useSeasonsList();
	
	return (
		<Page title="Past Seasons">
			<Card>
				<SeasonsList seasons={data?.seasons || []}/>
			</Card>
		</Page>
	);
}