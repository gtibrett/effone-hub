'use client';

import {OpensInNewWindow} from '@/components/ui';
import {faWikipediaW} from '@fortawesome/free-brands-svg-icons';
import {faClock, faFlagCheckered, faRobot} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link} from '@mui/material';
import {Card, CardContent, CardHeader, List, ListItem, ListItemIcon, ListItemText, Typography} from '@mui/material';

const Data = () => (
	<Card className="h-full">
		<CardHeader title="Data"/>
		<CardContent>
			<List>
				<ListItem>
					<ListItemIcon><FontAwesomeIcon icon={faFlagCheckered}/></ListItemIcon>
					<ListItemText
						primary={<Link href="https://github.com/f1db/f1db">F1DB <OpensInNewWindow/></Link>}
						secondary={<>Primary source for drivers, teams, circuits, races, results, and standings. Licensed <Link href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0 <OpensInNewWindow/></Link>.</>}
					/>
				</ListItem>
				<ListItem>
					<ListItemIcon><FontAwesomeIcon icon={faClock}/></ListItemIcon>
					<ListItemText
						primary={<Link href="https://github.com/jolpica/jolpica-f1">Jolpica-F1 <OpensInNewWindow/></Link>}
						secondary={<>Lap-by-lap timing data (drop-in successor to the retired Ergast API). Licensed <Link href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0 <OpensInNewWindow/></Link>.</>}
					/>
				</ListItem>
				<ListItem>
					<ListItemIcon><FontAwesomeIcon icon={faWikipediaW}/></ListItemIcon>
					<ListItemText
						primary={<Link href="https://wikipedia.org">Wikipedia <OpensInNewWindow/></Link>}
						secondary="Driver and constructor biographies + photos, fetched on-demand from the Wikipedia REST API."
					/>
				</ListItem>
				<ListItem>
					<ListItemIcon><FontAwesomeIcon icon={faRobot}/></ListItemIcon>
					<ListItemText
						primary={<Link href="https://openai.com">OpenAI <OpensInNewWindow/></Link>}
						secondary="Legacy circuit descriptions were generated using GPT (Davinci)."
					/>
				</ListItem>
			</List>
			<Typography
                variant="caption"
                className="text-text-secondary block mt-2">
				Ergast API was the original data source through 2024. F1DB and Jolpica-F1 are the active sources as of the 2025 season.
			</Typography>
		</CardContent>
	</Card>
);

export default Data;