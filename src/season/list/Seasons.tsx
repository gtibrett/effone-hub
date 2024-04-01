import SeasonsList from '@effonehub/season/list/SeasonsList';
import useSeasonsList from '@effonehub/season/list/useSeasonsList';
import {Page} from '@effonehub/ui-components';
import {setPageTitle} from '@gtibrett/mui-additions';
import {Card} from '@mui/material';

export default function Seasons() {
	setPageTitle('Past Seasons');
	const {data, loading} = useSeasonsList();
	
	return (
		<Page title="Past Seasons">
			<Card>
				<SeasonsList loading={loading} seasons={data}/>
			</Card>
		</Page>
	);
}