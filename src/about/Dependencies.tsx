import {Card, CardContent, CardHeader, List, ListItem, ListItemText, ListSubheader} from '@mui/material';
import {Fragment} from 'react';
import {Link, OpensInNewWindow} from '../ui-components';

type DependencyCategory = {
	title: string;
	links: {
		title: string;
		url: string;
	}[]
}

const dependencies: DependencyCategory[] = [
	{
		title: 'UI',
		links: [
			{title: 'Material UI', url: 'https://mui.com'},
			{title: 'FontAwesome', url: 'https://fontawesome.com/'},
			{title: 'Nivo Charts', url: 'https://nivo.rocks'}
		]
	},
	{
		title: 'Nationalities',
		links: [
			{title: 'emoji-flag', url: 'https://www.npmjs.com/package/emoji-flag'},
			{title: 'i18n-nationality', url: 'https://www.npmjs.com/package/i18n-nationality'}
		]
	},
	{
		title: 'Race Maps',
		links: [
			{title: 'world-atlas', url: 'https://www.npmjs.com/package/world-atlas'},
			{title: 'topojson-client', url: 'https://www.npmjs.com/package/topojson-client'},
			{title: 'f1laps-track-vectors', url: 'https://github.com/f1laps/f1-track-vectors'}
		]
	},
	{
		title: 'Data',
		links: [
			{title: 'ergast-f1-api', url: 'https://github.com/jcnewell/ergast-f1-api'},
			{title: 'wikipedia', url: 'https://www.npmjs.com/package/wikipedia'},
			{title: 'axios', url: 'https://www.npmjs.com/package/axios'}
		]
	}
];

const Dependencies = () => (
	<Card>
		<CardHeader title="Notable Dependencies"/>
		<CardContent>
			<List>
				{
					dependencies.map(category => (
						<Fragment key={category.title}>
							<ListSubheader>{category.title}</ListSubheader>
							{
								category.links.map(link => (
									<ListItem key={link.title}>
										<ListItemText primary={<Link href={link.url}>{link.title} <OpensInNewWindow/></Link>}/>
									</ListItem>
								))
							}
						</Fragment>
					))
				}
			</List>
		</CardContent>
	</Card>
);

export default Dependencies;