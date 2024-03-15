import {usePageTitle} from '@gtibrett/mui-additions';
import {Grid} from '@mui/material';
import {Page} from '@ui-components';
import Data from '../about/Data';
import Dependencies from '../about/Dependencies';
import Mission from '../about/Mission';
import Repositories from '../about/Repositories';

export default function About() {
	usePageTitle(`About`);
	
	return (
		<Page title="About effOne Hub">
			<Grid container spacing={2}>
				<Grid item xs={12} md={9}>
					<Grid container spacing={2} alignItems="strech">
						<Grid item xs={12}>
							<Mission/>
						</Grid>
						
						<Grid item xs={12} md={6}>
							<Data/>
						</Grid>
						
						<Grid item xs={12} md={6}>
							<Repositories/>
						</Grid>
					</Grid>
				</Grid>
				
				<Grid item xs={12} md={3}>
					<Dependencies/>
				</Grid>
			</Grid>
		</Page>
	);
}