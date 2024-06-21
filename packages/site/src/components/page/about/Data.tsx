import {OpensInNewWindow} from '@/components/ui';
import {faWikipediaW} from '@fortawesome/free-brands-svg-icons';
import {faFlagCheckered, faRobot} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link} from '@gtibrett/mui-additions';
import {Card, CardContent, CardHeader, List, ListItem, ListItemIcon, ListItemText} from '@mui/material';

const Data = () => (
	<Card sx={{height: '100%'}}>
		<CardHeader title="Data"/>
		<CardContent>
			<List>
				<ListItem>
					<ListItemIcon><FontAwesomeIcon icon={faFlagCheckered}/></ListItemIcon>
					<ListItemText
						primary={<Link href="https://ergast.com/mrd">Ergast API <OpensInNewWindow/></Link>}
						secondary="Source for all Formula One data, telemetry, schedules"
					/>
				</ListItem>
				<ListItem>
					<ListItemIcon><FontAwesomeIcon icon={faRobot}/></ListItemIcon>
					<ListItemText
						primary={<Link href="https://openai.com">OpenAI <OpensInNewWindow/></Link>}
						secondary="Circuit descriptions were generated using Davinci"
					/>
				</ListItem>
				<ListItem>
					<ListItemIcon><FontAwesomeIcon icon={faWikipediaW}/></ListItemIcon>
					<ListItemText
						primary={<Link href="https://wikipedia.org">Wikipedia <OpensInNewWindow/></Link>}
						secondary="Source for driver and constructor biographical and historical information"
					/>
				</ListItem>
			</List>
		</CardContent>
	</Card>
);

export default Data;