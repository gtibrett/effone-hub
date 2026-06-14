'use client';

import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	Card,
	CardContent,
	CardHeader,
	Link,
	List,
	ListItem,
	ListItemIcon,
	ListItemText
} from '@mui/material';

import { OpensInNewWindow } from '@/components/ui';

const Repositories = () => (
	<Card className="h-full">
		<CardHeader title="Repositories" />
		<CardContent>
			<List>
				<ListItem>
					<ListItemIcon>
						<FontAwesomeIcon icon={faGithub} />
					</ListItemIcon>
					<ListItemText
						primary={
							<Link href="https://github.com/gtibrett/effOneHub">
								effOneHub <OpensInNewWindow />
							</Link>
						}
						secondary="This site. Go look under the engine cover."
					/>
				</ListItem>
				<ListItem>
					<ListItemIcon>
						<FontAwesomeIcon icon={faGithub} />
					</ListItemIcon>
					<ListItemText
						primary={
							<Link href="https://github.com/gtibrett/effone-hub-graph">
								effone-hub-graph <OpensInNewWindow />
							</Link>
						}
						secondary="A GraphQL implementation of the Ergast API. Now deprecated."
					/>
				</ListItem>
				<ListItem>
					<ListItemIcon>
						<FontAwesomeIcon icon={faGithub} />
					</ListItemIcon>
				</ListItem>
			</List>
		</CardContent>
	</Card>
);

export default Repositories;
