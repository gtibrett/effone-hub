import {useAppState} from '@/components/app';
import {ConstructorsQuery, Drivers, History, Season} from '@/components/page/constructor';
import {DriverPodiums, DriverPoints, DriverQualifying} from '@/components/page/constructor/stats';
import {Flag, Page, WikipediaLink} from '@/components/ui';
import {Team} from '@/gql/graphql';
import {useGetTeamColor} from '@/hooks';
import {useConstructorData} from '@/hooks/data';
import {apolloClient} from '@/useApolloClient';
import {gql} from '@apollo/client';
import {setPageTitle, Tabs} from '@gtibrett/mui-additions';
import {Card, CardContent, CardHeader, CardMedia, Divider, Grid, Skeleton, Typography, useTheme} from '@mui/material';
import {useRouter} from 'next/router';

const TeamDetails = ({team}: { team: Team }) => {
	return (
		<Grid container spacing={4} sx={{fontSize: '1.5em', fontWeight: 'bold'}} alignItems="center">
			<Grid item><Typography variant="h2">{team.name}</Typography></Grid>
			{team.nationality && <Grid item><Flag nationality={team.nationality} size={48}/></Grid>}
		</Grid>
	);
};

const PageSkeleton = () => (
	<Page title="Loading">
		<Grid container spacing={2}>
			<Grid item xs={12} md={8} lg={9} order={{xs: 2, md: 1}}>
				<Card variant="outlined">
					<Skeleton variant="rectangular" height={600}/>
				</Card>
			</Grid>
			
			<Grid item xs={12} md={4} lg={3} order={{xs: 1, md: 2}}>
				<Card variant="outlined">
					<CardMedia>
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

export default function Constructor({teamRef, team}: { teamRef: Team['constructorRef'], team: Team }) {
	const theme             = useTheme();
	const {isFallback}      = useRouter();
	const getTeamColor      = useGetTeamColor();
	const [{currentSeason}] = useAppState();
	const {data, loading}   = useConstructorData(teamRef || '', currentSeason);
	
	setPageTitle(`Constructor: ${team?.name}`);
	
	if (!data?.team || loading || isFallback) {
		return <PageSkeleton/>;
	}
	
	const isInCurrentSeason = typeof data?.team.standings.find(s => s.year === currentSeason) !== 'undefined';
	
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
	
	if (data.team.standings.find(s => s.year === currentSeason)) {
		tabs.push({
			id:      'season', label: `${currentSeason} Season`,
			content: <Season data={data} loading={loading} season={currentSeason}/>
		});
	}
	
	return (
		<Page
			title={<TeamDetails team={team}/>}
			subheader={<>
				{team.bio?.extract && <Typography variant="body1">{team.bio.extract + ''}</Typography>}
				<Divider orientation="horizontal" sx={{my: 1}}/>
				<WikipediaLink href={team.url}/>
			</>}
			headerProps={{
				sx: {
					position:   'relative',
					pt:         3,
					'&:before': {
						position:   'absolute',
						left:       0,
						top:        0,
						bottom:     'auto',
						width:      '100%',
						height:     theme.spacing(2),
						content:    '" "',
						background: getTeamColor(team.colors)
					}
				}
			}}
		>
			<Grid container spacing={2}>
				<Grid item xs={12} md={isInCurrentSeason ? 8 : 12} lg={isInCurrentSeason ? 9 : 12} order={{xs: 2, md: 1}}>
					<Card variant="outlined">
						<Tabs active="history" tabs={tabs}/>
					</Card>
				</Grid>
				
				{
					isInCurrentSeason &&
					<Grid item xs={12} md={4} lg={3} order={{xs: 1, md: 2}}>
						<Card variant="outlined">
							<CardHeader title={`${currentSeason} Season Stats`}/>
							<CardContent>
								<Grid container spacing={2}>
									<DriverPoints teamId={team.teamId} season={currentSeason} place={1}/>
									<DriverPoints teamId={team.teamId} season={currentSeason} place={2}/>
									<Grid item xs={12}><Typography variant="h4">Podiums</Typography></Grid>
									<DriverPodiums teamId={team.teamId} season={currentSeason} place={1}/>
									<DriverPodiums teamId={team.teamId} season={currentSeason} place={2}/>
									<Grid item xs={12}><Typography variant="h4">Qualifying Head-to-Head</Typography></Grid>
									<DriverQualifying teamId={team.teamId} season={currentSeason} place={1}/>
									<DriverQualifying teamId={team.teamId} season={currentSeason} place={2}/>
								</Grid>
							</CardContent>
						</Card>
					</Grid>
				}
			</Grid>
		</Page>
	);
}

export const ConstructorDataQuery = gql`
	query ConstructorDataQuery($constructorRef: String!) {
		team: teamByConstructorRef(constructorRef: $constructorRef) {
			teamId
			constructorRef
			name
			nationality
			colors {
				primary
			}
			url
			bio {
				extract
			}
		}
	}
`;

export async function getStaticProps({params: {teamRef}}: { params: { teamRef: string } }) {
	const {data: {team}} = await apolloClient.query({query: ConstructorDataQuery, variables: {constructorRef: teamRef}});
	
	return {
		props: {
			teamRef,
			team:           team || null
		}
	};
}

export async function getStaticPaths() {
	const {data: {teams}} = await apolloClient.query<{ teams: Team[] }>({query: ConstructorsQuery});
	
	const paths = teams.map(team => ({
		params: {teamRef: team.constructorRef}
	}));
	
	return {paths, fallback: 'blocking'};
}