import {alpha, Card, Link, List, ListItem, ListItemText, Paper, Skeleton, Typography, useTheme} from '@mui/material';
import axios from 'axios';
import Markdown from 'markdown-to-jsx';
import {useEffect, useState} from 'react';

export default function About() {
	const theme               = useTheme();
	const [readme, setReadme] = useState<string | undefined>();
	
	useEffect(() => {
		axios.get('https://raw.githubusercontent.com/gtibrett/effOneHub/main/README.md')
		     .then(response => response.data)
		     .then(data => setReadme(data));
	}, []);
	
	if (!readme) {
		return <Skeleton variant="text" height={400}/>;
	}
	
	return (
		<Paper sx={{p: 3}}>
			<Markdown options={{
				overrides: {
					h1: {
						component: Typography,
						props: {
							display: 'none'
						}
					},
					h2: {
						component: Typography,
						props: {
							variant: 'h4'
						}
					},
					h3: {
						component: Typography,
						props: {
							variant: 'h5'
						}
					},
					h4: {
						component: Typography,
						props: {
							variant: 'h6'
						}
					},
					blockquote: {
						component: Typography,
						props: {
							display: 'none'
						}
					},
					ul: {
						component: List,
						props: {
							dense: true
						}
					},
					li: (props: any) => <ListItem><ListItemText {...props}/></ListItem>,
					code: (props: any) => <Card variant="outlined" sx={{background: alpha(theme.palette.background.default, .25), p: 2, fontSize: '.9em', fontFamily: 'Roboto Mono', whiteSpace: 'pre'}} {...props}/>,
					a: {
						component: Link,
						props: {
							color: 'secondary'
						}
					}
				}
			}}>{readme}</Markdown>
		</Paper>
	);
}