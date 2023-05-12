import {faGithub} from '@fortawesome/free-brands-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Card, CardContent, CardHeader, List, ListItem, ListItemIcon, ListItemText} from '@mui/material';
import {Link, OpensInNewWindow} from '../ui-components';

const Repositories = () => (
	<Card sx={{height: '100%'}}>
		<CardHeader title="Repositories"/>
		<CardContent>
			<List>
				<ListItem>
					<ListItemIcon><FontAwesomeIcon icon={faGithub}/></ListItemIcon>
					<ListItemText
						primary={<Link href="https://github.com/gtibrett/effOneHub">effOneHub <OpensInNewWindow/></Link>}
						secondary="This site. Go look under the engine cover."
					/>
				</ListItem>
				<ListItem>
					<ListItemIcon><FontAwesomeIcon icon={faGithub}/></ListItemIcon>
					<ListItemText
						primary={<Link href="https://github.com/gtibrett/effone-hub-api">effone-hub-api <OpensInNewWindow/></Link>}
						secondary="A nodejs implementation of the Ergast API. Still a work in progress."
					/>
				</ListItem>
			</List>
		</CardContent>
	</Card>
);

export default Repositories;