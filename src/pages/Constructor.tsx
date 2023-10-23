import {Tabs, usePageTitle} from '@gtibrett/mui-additions';
import {Box, Card, CardContent, CardMedia, Divider, Grid, Skeleton, Typography, useTheme} from '@mui/material';
import {useRef} from 'react';
import {useParams} from 'react-router';
import {useAppState} from '../app/AppStateProvider';
import {History, Season, TeamData, useConstructorData} from '../constructor';
import Drivers from '../constructor/Drivers';
import Flag from '../Flag';
import {Page, useGetAccessibleColor, WikipediaLink} from '../ui-components';

const TeamDetails = ({team}: { team: TeamData }) => {
	return (
		<Grid container spacing={4} sx={{fontSize: '1.5em', fontWeight: 'bold'}} alignItems="center">
			<Grid item><Typography variant="h2">{team.name}</Typography></Grid>
			<Grid item><Flag nationality={team.nationality} size={48}/></Grid>
		</Grid>
	);
};

export default function Constructor() {
	const theme                   = useTheme();
	const [{currentSeason}]       = useAppState();
	const getColorByConstructorId = useGetAccessibleColor();
	const ref                     = useRef(null);
	const {teamRef}               = useParams();
	const {data, loading}         = useConstructorData(teamRef, currentSeason);
	const team                    = data?.team;
	
	usePageTitle(`Constructor: ${team?.name}`);
	
	if (!team || loading) {
		return (
			<Page title="Loading">
				<Grid container spacing={2}>
					<Grid item xs={12} md={8} lg={9} order={{xs: 2, md: 1}}>
						<Card variant="outlined">
							<Skeleton variant="rectangular" height={600}/>
						</Card>
					</Grid>
					
					<Grid item xs={12} md={4} lg={3} order={{xs: 1, md: 2}}>
						<Card variant="outlined">
							<CardMedia ref={ref}>
								<Skeleton variant="rectangular" sx={{height: {xs: 24, md: 48}}}/>
							</CardMedia>
							<CardContent>
								<Typography variant="body1">
									<Skeleton variant="text"/>
									<Skeleton variant="text"/>
									<Skeleton variant="text"/>
									<Skeleton variant="text"/>
									<Skeleton variant="text"/>
									<Skeleton variant="text"/>
									<Skeleton variant="text"/>
									<Skeleton variant="text"/>
									<Skeleton variant="text"/>
									<Skeleton variant="text"/>
									<Skeleton variant="text"/>
									<Skeleton variant="text" width={125}/>
								</Typography>
								<Divider orientation="horizontal" sx={{my: 1}}/>
								<Skeleton variant="text"/>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</Page>
		);
	}
	
	const tabs = [
		{
			id:      'history', label: 'History',
			content: <History data={data} loading={loading}/>
		},
		{
			id:      'drivers', label: 'Drivers',
			content: <Drivers data={data} loading={loading}/>
		}
	];
	
	if (team.standings.find(s => s.year === currentSeason)) {
		tabs.push({
			id:      'season', label: `${currentSeason} Season`,
			content: <Season data={data} loading={loading} season={currentSeason}/>
		});
	}
	
	return (
		<Page title={<TeamDetails team={team}/>}>
			<Grid container spacing={2}>
				<Grid item xs={12} md={8} lg={9} order={{xs: 2, md: 1}}>
					<Card variant="outlined">
						<Tabs active="history" tabs={tabs}/>
					</Card>
				</Grid>
				
				<Grid item xs={12} md={4} lg={3} order={{xs: 1, md: 2}}>
					<Card variant="outlined">
						<CardMedia ref={ref}>
							<Box sx={{height: {xs: 24, md: 48}, background: getColorByConstructorId(team.colors.primary || theme.palette.primary.main, true)}}/>
						</CardMedia>
						<CardContent>
							<Typography variant="body1">{team.bio.extract}</Typography>
							<Divider orientation="horizontal" sx={{my: 1}}/>
							<WikipediaLink href={team.url}/>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</Page>
	);
}