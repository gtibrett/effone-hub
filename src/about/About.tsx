import {Page} from '@effonehub/ui-components';
import {setPageTitle} from '@gtibrett/mui-additions';
import {Grid} from '@mui/material';
import Data from './Data';
import Dependencies from './Dependencies';
import Mission from './Mission';
import Repositories from './Repositories';

export default function About() {
	setPageTitle(`About`);
	
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