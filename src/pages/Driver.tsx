import {Driver as DriverT} from '@gtibrett/effone-hub-graph-api';
import {Tabs, usePageTitle} from '@gtibrett/mui-additions';
import {Card, CardContent, CardMedia, Divider, Grid, Hidden, Skeleton, Typography, useTheme} from '@mui/material';
import {Page, useGetAccessibleColor, WikipediaLink} from '@ui-components';
import {useParams} from 'react-router';
import {useAppState} from '../app/AppStateProvider';
import {Career, Circuits, DriverAvatar, Season, useDriver} from '../driver';
import Flag from '../Flag';

const DriverSkeleton = () => {
	return (
		<Page title="Loading...">
			<Grid container spacing={2}>
				<Grid item xs={12} md={8} lg={9} order={{xs: 2, md: 1}}>
					<Card>
						<Skeleton variant="rectangular" height={600}/>
					</Card>
				</Grid>
				
				<Grid item xs={12} md={4} lg={3} order={{xs: 1, md: 2}}>
					<Card variant="outlined">
						<Hidden mdDown>
							<CardMedia>
								<DriverAvatar size={200}/>
							</CardMedia>
						</Hidden>
						
						<CardContent>
							<Grid container spacing={2}>
								<Hidden mdUp>
									<Grid item><DriverAvatar size={128}/></Grid>
								</Hidden>
								
								<Grid item xs>
									<Typography variant="body2"><Skeleton variant="text"/></Typography>
									<Divider orientation="horizontal" sx={{my: 1}}/>
									<Typography variant="body1">
										<Skeleton variant="text"/>
										<Skeleton variant="text"/>
										<Skeleton variant="text"/>
										<Skeleton variant="text" width={125}/>
									</Typography>
									<Divider orientation="horizontal" sx={{my: 1}}/>
									<Skeleton variant="text"/>
								</Grid>
							</Grid>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</Page>
	);
};

const DriverDetails = ({driver}: {
	driver: DriverT
}) => {
	return (
		<Grid container spacing={2} sx={{fontSize: '1.5em', fontWeight: 'bold'}} alignItems="center">
			<Grid item><Typography variant="h2">{driver.forename} {driver.surname}</Typography></Grid>
			<Hidden mdDown>
				<Grid item><Flag nationality={driver.nationality} size={48}/></Grid>
				<Grid item xs/>
				<Grid item><Typography variant="h2" sx={{fontWeight: 'bold'}}>{driver.code}</Typography></Grid>
				<Grid item sx={{fontFamily: 'Racing Sans One', fontSize: '1.1em'}}>{driver.number}</Grid>
			</Hidden>
		</Grid>
	);
};


export default function Driver() {
	const theme              = useTheme();
	const getAccessibleColor = useGetAccessibleColor();
	const [{currentSeason}]  = useAppState();
	const {driverRef}        = useParams();
	const driver             = useDriver(driverRef);
	
	usePageTitle(`Driver: ${driver ? `${driver?.forename} ${driver?.surname}` : 'Loading'}`);
	
	if (!driverRef) {
		throw new Error('Page Not found');
	}
	
	if (!driver) {
		return <DriverSkeleton/>;
	}
	
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
				<Typography variant="body1">{driver.bio.extract}</Typography>
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
						background: getAccessibleColor(driver.currentTeam.team.colors.primary || theme.palette.primary.main, true)
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