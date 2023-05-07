import {faGithub, faWikipediaW} from '@fortawesome/free-brands-svg-icons';
import {faFlagCheckered, faRobot} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Card, CardContent, CardHeader, Grid, Link, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Typography} from '@mui/material';
import {visuallyHidden} from '@mui/utils';
import usePageTitle from '../ui-components/usePageTitle';

export default function About() {
	usePageTitle(`About`);
	
	const handleLink       = (url: string) => () => window.open(url);
	const opensInNewWindow = <Typography sx={visuallyHidden}>(opens in a new window)</Typography>;
	
	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Card elevation={0}>
					<CardHeader title="About effOne Hub"/>
				</Card>
			</Grid>
			
			<Grid item xs={12} md={9}>
				<Grid container spacing={2} alignItems="strech">
					<Grid item xs={12}>
						<Card elevation={0}>
							<CardHeader title="Mission"/>
							<CardContent>
								<Typography variant="body1" paragraph>This site was built as a fun side project, using React & Material-UI. It is an experiment in visualizing current and historical Formula One data. It is Open Source and utilizes many other open projects and data sources. app consuming the Ergast API Formula One dataset.</Typography>
								<Typography variant="body1" paragraph>You can view historical Formula One data back to 1950. Race results, qualifying, Driver's and Constructor's championship standings. Lap Times, Pit Stops and overtakes for each race.</Typography>
								<Typography variant="body1" paragraph>Some of the data contained within comes from <Link href="https://wikipedia.org" target="_blank">Wikipedia {opensInNewWindow}</Link>. Other data was generated using AI, from <Link href="https://openai.com" target="_blank">OpenAI {opensInNewWindow}</Link></Typography>
							</CardContent>
						</Card>
					</Grid>
					
					<Grid item xs={12} md={6}>
						<Card elevation={0} sx={{height: '100%'}}>
							<CardHeader title="Data"/>
							<CardContent>
								<List>
									<ListItemButton onClick={handleLink('http://ergast.com/mrd')}>
										<ListItemIcon><FontAwesomeIcon icon={faFlagCheckered}/></ListItemIcon>
										<ListItemText
											primary={<Link href="">Ergast API {opensInNewWindow}</Link>}
											secondary="Source for all Formula One data, telemetry, schedules"
										/>
									</ListItemButton>
									<ListItemButton onClick={handleLink('http://openai.com')}>
										<ListItemIcon><FontAwesomeIcon icon={faRobot}/></ListItemIcon>
										<ListItemText
											primary={<Link href="">OpenAI {opensInNewWindow}</Link>}
											secondary="Circuit descriptions were generated using Davinci"
										/>
									</ListItemButton>
									<ListItemButton onClick={handleLink('http://wikipedia')}>
										<ListItemIcon><FontAwesomeIcon icon={faWikipediaW}/></ListItemIcon>
										<ListItemText
											primary={<Link href="">Wikipedia {opensInNewWindow}</Link>}
											secondary="Source for driver and constructor biographical and historical information"
										/>
									</ListItemButton>
								
								</List>
							</CardContent>
						</Card>
					</Grid>
					
					<Grid item xs={12} md={6}>
						<Card elevation={0} sx={{height: '100%'}}>
							<CardHeader title="Repositories"/>
							<CardContent>
								<List>
									<ListItemButton onClick={handleLink('https://github.com/gtibrett/effOneHub')}>
										<ListItemIcon><FontAwesomeIcon icon={faGithub}/></ListItemIcon>
										<ListItemText
											primary={<Link href="">effOneHub {opensInNewWindow}</Link>}
											secondary="This site. Go look under the engine cover."
										/>
									</ListItemButton>
									<ListItemButton onClick={handleLink('https://github.com/gtibrett/effone-hub-api')}>
										<ListItemIcon><FontAwesomeIcon icon={faGithub}/></ListItemIcon>
										<ListItemText
											primary={<Link href="">effone-hub-api {opensInNewWindow}</Link>}
											secondary="A nodejs implementation of the Ergast API. Still a work in progress."
										/>
									</ListItemButton>
								</List>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</Grid>
			
			<Grid item xs={12} md={3}>
				<Card elevation={0}>
					<CardHeader title="Notable Dependencies"/>
					<CardContent>
						<List>
							<ListSubheader>UI</ListSubheader>
							<ListItemButton onClick={handleLink('https://mui.com')}>
								<ListItemText primary="Material UI"/>
							</ListItemButton>
							<ListItemButton onClick={handleLink('https://fontawesome.com/')}>
								<ListItemText primary="FontAwesome"/>
							</ListItemButton>
							<ListItemButton onClick={handleLink('https://nivo.rocks')}>
								<ListItemText primary="Nivo Charts"/>
							</ListItemButton>
							<ListSubheader>Nationalities</ListSubheader>
							<ListItemButton onClick={handleLink('https://www.npmjs.com/package/emoji-flag')}>
								<ListItemText primary="emoji-flag"/>
							</ListItemButton>
							<ListItemButton onClick={handleLink('https://www.npmjs.com/package/i18n-nationality')}>
								<ListItemText primary="i18n-nationality"/>
							</ListItemButton>
							<ListSubheader>Race Maps</ListSubheader>
							<ListItemButton onClick={handleLink('https://www.npmjs.com/package/world-atlas')}>
								<ListItemText primary="world-atlas"/>
							</ListItemButton>
							<ListItemButton onClick={handleLink('https://www.npmjs.com/package/topojson-client')}>
								<ListItemText primary="topojson-client"/>
							</ListItemButton>
							<ListItemButton onClick={handleLink('https://github.com/f1laps/f1-track-vectors')}>
								<ListItemText primary="f1laps-track-vectors"/>
							</ListItemButton>
							<ListSubheader>Data</ListSubheader>
							<ListItemButton onClick={handleLink('https://github.com/jcnewell/ergast-f1-api')}>
								<ListItemText primary="ergast-f1-api"/>
							</ListItemButton>
							<ListItemButton onClick={handleLink('https://www.npmjs.com/package/wikipedia')}>
								<ListItemText primary="wikipedia"/>
							</ListItemButton>
							<ListItemButton onClick={handleLink('https://www.npmjs.com/package/axios')}>
								<ListItemText primary="axios"/>
							</ListItemButton>
						
						
						</List>
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	);
}