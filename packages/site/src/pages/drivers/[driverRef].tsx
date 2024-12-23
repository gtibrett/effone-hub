import {DriverAvatar, useAppState} from '@/components/app';
import {Career, Circuits, Season} from '@/components/page/driver';
import {Flag, Page, WikipediaLink} from '@/components/ui';
import {Driver as DriverT} from '@/gql/graphql';
import {useGetTeamColor} from '@/hooks';
import {DriverQuery} from '@/hooks/data/useDriver';
import {apolloClient} from '@/useApolloClient';
import {setPageTitle, Tabs} from '@gtibrett/mui-additions';
import {Card, Divider, Grid, Hidden, Typography, useTheme} from '@mui/material';
import DriversQuery from '../../components/page/driver/DriversQuery';

const DriverDetails = ({driver}: {
	driver: DriverT
}) => {
	return (
		<Grid container spacing={2} sx={{fontSize: '1.5em', fontWeight: 'bold'}} alignItems="center">
			<Grid item><Typography variant="h2">{driver.forename} {driver.surname}</Typography></Grid>
			<Hidden mdDown>
				{driver.nationality && <Grid item><Flag nationality={driver.nationality} size={48}/></Grid>}
				<Grid item xs/>
				<Grid item><Typography variant="h2" sx={{fontWeight: 'bold'}}>{driver.code}</Typography></Grid>
				<Grid item sx={{fontFamily: 'Racing Sans One', fontSize: '1.1em'}}>{driver.number}</Grid>
			</Hidden>
		</Grid>
	);
};

export default function Driver({driver}: { driver: DriverT }) {
	const theme             = useTheme();
	const getTeamColor      = useGetTeamColor();
	const [{currentSeason}] = useAppState();
	
	setPageTitle(`Driver: ${driver?.forename} ${driver?.surname}`);
	
	const tabs = [
		{id: 'career', label: 'Career', content: <Career driverId={driver.driverId}/>},
		{id: 'circuits', label: 'Circuits', content: <Circuits driverId={driver.driverId}/>}
	
	];
	
	if (driver.teamsByYear[0].year === currentSeason) {
		tabs.push({id: 'season', label: `${currentSeason} Season`, content: <Season driverId={driver.driverId} season={currentSeason}/>});
	}
	
	return (
		<Page
			title={<DriverDetails driver={driver}/>}
			action={<DriverAvatar driverId={driver.driverId} size={200}/>}
			actionProps={{xs: 'auto'}}
			subheader={<>
				{driver.bio && <Typography variant="body1">{driver.bio.extract}</Typography>}
				<Divider orientation="horizontal" sx={{my: 1}}/>
				<WikipediaLink href={driver.url}/>
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
						background: getTeamColor(driver.currentTeam?.team?.colors, 'primary', false)
					}
				}
			}}
		>
			<Card>
				<Tabs active="career" tabs={tabs}/>
			</Card>
		</Page>
	);
}

export async function getStaticProps({params: {driverRef}}: { params: { driverRef: string, driver: DriverT } }) {
	const {data: {driverByRef: driver}} = await apolloClient.query({query: DriverQuery, variables: {driverRef, useDriverRef: true}});
	
	return {
		props: {
			driverRef,
			driver: driver || null
		}
	};
}

export async function getStaticPaths() {
	const {data: {drivers}} = await apolloClient.query<{ drivers: DriverT[] }>({query: DriversQuery});
	
	const paths = drivers.map(driver => ({
		params: {driverRef: driver.driverRef}
	}));
	
	return {paths, fallback: 'blocking'};
}