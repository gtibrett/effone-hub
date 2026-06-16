'use client';

import { Fragment } from 'react';
import {
	Card,
	CardContent,
	CardHeader,
	Link,
	List,
	ListItem,
	ListItemText,
	ListSubheader
} from '@mui/material';

import { OpensInNewWindow } from '@/components/ui';

type DependencyCategory = {
	title: string;
	links: {
		title: string;
		url: string;
	}[];
};

const dependencies: DependencyCategory[] = [
	{
		title: 'Framework',
		links: [
			{ title: 'Next.js', url: 'https://nextjs.org' },
			{ title: 'React', url: 'https://react.dev' }
		]
	},
	{
		title: 'UI',
		links: [
			{ title: 'Material UI', url: 'https://mui.com' },
			{ title: 'MUI X Charts', url: 'https://mui.com/x/react-charts/' },
			{ title: 'MUI X Data Grid', url: 'https://mui.com/x/react-data-grid/' },
			{ title: 'Tailwind CSS', url: 'https://tailwindcss.com' },
			{ title: 'FontAwesome', url: 'https://fontawesome.com/' }
		]
	},
	{
		title: 'Nationalities',
		links: [
			{ title: 'emoji-flags', url: 'https://www.npmjs.com/package/emoji-flags' },
			{ title: 'i18n-nationality', url: 'https://www.npmjs.com/package/i18n-nationality' }
		]
	},
	{
		title: 'Race Maps',
		links: [
			{ title: 'react-simple-maps', url: 'https://www.npmjs.com/package/react-simple-maps' },
			{ title: 'world-atlas', url: 'https://www.npmjs.com/package/world-atlas' },
			{ title: 'topojson-client', url: 'https://www.npmjs.com/package/topojson-client' },
			{ title: 'f1laps-track-vectors', url: 'https://github.com/f1laps/f1-track-vectors' }
		]
	},
	{
		title: 'Data',
		links: [
			{ title: 'PostGraphile', url: 'https://postgraphile.org' },
			{ title: '@apollo/client', url: 'https://www.npmjs.com/package/@apollo/client' },
			{ title: 'graphql', url: 'https://www.npmjs.com/package/graphql' }
		]
	}
];

const Dependencies = () => (
	<Card>
		<CardHeader title="Notable Dependencies" />
		<CardContent>
			<List>
				{dependencies.map(category => (
					<Fragment key={category.title}>
						<ListSubheader>{category.title}</ListSubheader>
						{category.links.map(link => (
							<ListItem key={link.title}>
								<ListItemText
									primary={
										<Link href={link.url}>
											{link.title} <OpensInNewWindow />
										</Link>
									}
								/>
							</ListItem>
						))}
					</Fragment>
				))}
			</List>
		</CardContent>
	</Card>
);

export default Dependencies;
