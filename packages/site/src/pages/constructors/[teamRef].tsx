import {useAppState} from '@/components/app';
import {ConstructorsQuery, Drivers, History, Season} from '@/components/page/constructor';
import {DriverPodiums, DriverPoints, DriverQualifying} from '@/components/page/constructor/stats';
import {Flag, Page, WikipediaLink} from '@/components/ui';
import {useGetTeamColor} from '@/hooks';
import {useConstructorData} from '@/hooks/data';
import {apolloClient} from '@/useApolloClient';
import {gql} from '@apollo/client';
import {setPageTitle, Tabs} from '@gtibrett/mui-additions';
import {Card, CardContent, CardHeader, CardMedia, Divider, Grid, Skeleton, Typography, useTheme} from '@mui/material';
import {useRouter} from 'next/router';

type TeamProp = {
	id: string;
	name?: string | null;
	countryId?: string | null;
	colors?: { primaryHex?: string | null } | null;
};

const TeamDetails = ({team}: { team: TeamProp }) => {
	return (
		<Grid container spacing={4} sx={{fontSize: '1.5em', fontWeight: 'bold'}} alignItems="center">
			<Grid item><Typography variant="h2">{team.name}</Typography></Grid>
			{team.countryId && <Grid item><Flag nationality={team.countryId} size={48}/></Grid>}
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

export default function Constructor({teamRef, team}: { teamRef: string, team: TeamProp }) {
	const theme             = useTheme();
	const {isFallback}      = useRouter();
	const getTeamColor      = useGetTeamColor();
	const [{currentSeason}] = useAppState();
	const {data, loading}   = useConstructorData(teamRef || '', currentSeason);
	
	setPageTitle(`Constructor: ${team?.name}`);
	
	if (!data?.team || loading || isFallback) {
		return <PageSkeleton/>;
	}
	
	const isInCurrentSeason = typeof data?.team.standings.nodes.find((s: any) => s.year === currentSeason) !== 'undefined';
	
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
	
	if (data.team.standings.nodes.find((s: any) => s.year === currentSeason)) {
		tabs.push({
			id:      'season', label: `${currentSeason} Season`,
			content: <Season data={data} loading={loading} season={currentSeason}/>
		});
	}
	
	return (
		<Page
			title={<TeamDetails team={team}/>}
			subheader={<>
				<Divider orientation="horizontal" sx={{my: 1}}/>
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
						background: getTeamColor({primary: team.colors?.primaryHex} as any)
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
									<DriverPoints constructorId={team.id} season={currentSeason} place={1}/>
									<DriverPoints constructorId={team.id} season={currentSeason} place={2}/>
									<Grid item xs={12}><Typography variant="h4">Podiums</Typography></Grid>
									<DriverPodiums constructorId={team.id} season={currentSeason} place={1}/>
									<DriverPodiums constructorId={team.id} season={currentSeason} place={2}/>
									<Grid item xs={12}><Typography variant="h4">Qualifying Head-to-Head</Typography></Grid>
									<DriverQualifying constructorId={team.id} season={currentSeason} place={1}/>
									<DriverQualifying constructorId={team.id} season={currentSeason} place={2}/>
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
	query ConstructorPageStaticQuery($constructorRef: String!) {
		teams(condition: {rowId: $constructorRef}) {
			nodes {
				id
				name
				countryId
				colors {
					primaryHex
				}
			}
		}
	}
`;

export async function getStaticProps({params: {teamRef}}: { params: { teamRef: string } }) {
	const {data: {teams}} = await apolloClient.query<{ teams: { nodes: TeamProp[] } }>({query: ConstructorDataQuery, variables: {constructorRef: teamRef}});

	return {
		props: {
			teamRef,
			team: teams.nodes[0] || null
		}
	};
}

export async function getStaticPaths() {
	const {data: {teams}} = await apolloClient.query<{ teams: { nodes: { id: string }[] } }>({query: ConstructorsQuery});

	const paths = teams.nodes.map(team => ({
		params: {teamRef: team.id}
	}));

	return {paths, fallback: 'blocking'};
}