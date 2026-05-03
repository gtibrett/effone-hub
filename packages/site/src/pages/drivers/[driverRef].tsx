import {DriverAvatar, useAppState} from '@/components/app';
import {Career, Circuits, Season} from '@/components/page/driver';
import {Flag, Page} from '@/components/ui';
import {Driver as DriverT} from '@/gql/graphql';
import {useGetTeamColor} from '@/hooks';
import {DriverQuery} from '@/hooks/data/useDriver';
import useBioRefresh from '@/hooks/useBioRefresh';
import {apolloClient} from '@/useApolloClient';
import {setPageTitle, Tabs} from '@gtibrett/mui-additions';
import {Box, Card, Divider, Grid, Hidden, Typography, useTheme} from '@mui/material';
import DriversQuery from '../../components/page/driver/DriversQuery';

const DriverDetails = ({driver}: {
	driver: DriverT
}) => {
	return (
		<Grid container spacing={2} sx={{fontSize: '1.5em', fontWeight: 'bold'}} alignItems="center">
			<Grid item><Typography variant="h2">{driver.firstName} {driver.lastName}</Typography></Grid>
			<Hidden mdDown>
				{driver.nationalityCountryId && <Grid item><Flag nationality={driver.nationalityCountryId} size={48}/></Grid>}
				<Grid item xs/>
				<Grid item><Typography variant="h2" sx={{fontWeight: 'bold'}}>{driver.abbreviation}</Typography></Grid>
				<Grid item sx={{fontFamily: 'Racing Sans One', fontSize: '1.1em'}}>{driver.permanentNumber}</Grid>
			</Hidden>
		</Grid>
	);
};

export default function Driver({driver}: { driver: DriverT }) {
	const theme             = useTheme();
	const getTeamColor      = useGetTeamColor();
	const [{currentSeason}] = useAppState();

	setPageTitle(`Driver: ${driver?.firstName} ${driver?.lastName}`);

	const latestSeasonNode  = driver.seasonEntrantDrivers?.nodes?.[0];
	const primaryColor      = latestSeasonNode?.team?.colors?.primaryHex;
	const isCurrentSeason   = latestSeasonNode?.year === currentSeason;

	useBioRefresh('driver', driver.rowId, isCurrentSeason);

	const tabs = [
		{id: 'career', label: 'Career', content: <Career driverId={driver.rowId}/>},
		{id: 'circuits', label: 'Circuits', content: <Circuits driverId={driver.rowId}/>}

	];

	if (isCurrentSeason) {
		tabs.push({id: 'season', label: `${currentSeason} Season`, content: <Season driverId={driver.rowId} season={currentSeason}/>});
	}

	const bio = driver.bio;

	return (
		<Page
			title={<DriverDetails driver={driver}/>}
			action={
				bio?.thumbnailUrl
					? <Box component="img" src={bio.thumbnailUrl} alt={`${driver.firstName} ${driver.lastName}`} sx={{width: 200, height: 200, objectFit: 'cover', borderRadius: 1}}/>
					: <DriverAvatar driverId={driver.rowId} size={200}/>
			}
			actionProps={{xs: 'auto'}}
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
						background: primaryColor ?? 'transparent'
					}
				}
			}}
		>
			{bio?.extract && (
				<Card sx={{mb: 2, p: 2}}>
					<Typography variant="body1">{bio.extract}</Typography>
				</Card>
			)}
			<Card>
				<Tabs active="career" tabs={tabs}/>
			</Card>
		</Page>
	);
}

export async function getStaticProps({params: {driverRef}}: { params: { driverRef: string, driver: DriverT } }) {
	const {data: {driver}} = await apolloClient.query({query: DriverQuery, variables: {id: driverRef}});

	return {
		props: {
			driverRef,
			driver: driver || null
		}
	};
}

export async function getStaticPaths() {
	const {data: {drivers}} = await apolloClient.query<{ drivers: { nodes: DriverT[] } }>({query: DriversQuery});

	const paths = drivers.nodes.map(driver => ({
		params: {driverRef: driver.rowId}
	}));

	return {paths, fallback: 'blocking'};
}