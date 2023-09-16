import {Tabs, useComponentDimensionsWithRef, usePageTitle} from '@gtibrett/mui-additions';
import {Card, CardContent, CardMedia, Divider, Grid, Hidden, Typography} from '@mui/material';
import {useParams} from 'react-router';
import {useAppState} from '../app/AppStateProvider';
import {Career, Circuits, DriverData, Season, useDriverData} from '../driver';
import DriverAvatar from '../drivers/DriverAvatar';
import Flag from '../Flag';
import {Page, WikipediaLink} from '../ui-components';

const DriverDetails = ({driver}: { driver: DriverData }) => {
	return (
		<Grid container spacing={2} sx={{fontSize: '1.5em', fontWeight: 'bold'}} alignItems="center">
			<Grid item><Typography variant="h2">{driver.forename} {driver.surname}</Typography></Grid>
			<Hidden mdDown>
				<Grid item><Flag nationality={driver.nationality} size={48}/></Grid>
				<Grid item xs/>
				<Grid item>{driver.code}</Grid>
				<Grid item sx={{fontFamily: 'Racing Sans One', fontSize: '1.1em'}}>{driver.number}</Grid>
			</Hidden>
		</Grid>
	);
};


export default function Driver() {
	const [{currentSeason}]          = useAppState();
	const {ref, dimensions: {width}} = useComponentDimensionsWithRef();
	const {driverRef}                = useParams();
	const {data, loading}            = useDriverData(driverRef, currentSeason);
	const driver                     = data?.driver;
	
	usePageTitle(`Driver: ${driver ? `${driver?.forename} ${driver?.surname}` : 'Loading'}`);
	
	if (!driver || loading) {
		return null; // TODO skeleton
	}
	
	const tabs = [
		{id: 'career', label: 'Career', content: <Career data={data} loading={loading}/>},
		{id: 'circuits', label: 'Circuits', content: <Circuits data={data} loading={loading} driverId={driver.driverId}/>},
		
	];
	
	if (driver.standings.find(s=>s.year === currentSeason)) {
		tabs.push({id: 'season', label: `${currentSeason} Season`, content: <Season data={data} loading={loading} />});
	}
	
	return (
		<Page title={<DriverDetails driver={driver}/>}>
			<Grid container spacing={2}>
				<Grid item xs={12} md={8} lg={9} order={{xs: 2, md: 1}}>
					<Card>
						<Tabs active="career" tabs={tabs}/>
					</Card>
				</Grid>
				
				<Grid item xs={12} md={4} lg={3} order={{xs: 1, md: 2}}>
					<Card variant="outlined">
						<CardMedia ref={ref}>
							<Hidden mdDown>
								<DriverAvatar driverId={driver.driverId} size={width}/>
							</Hidden>
						</CardMedia>
						
						<CardContent>
							<Grid container spacing={2}>
								<Hidden mdUp>
									<Grid item><DriverAvatar driverId={driver.driverId} size={128}/></Grid>
								</Hidden>
								
								<Grid item xs>
									<Typography variant="body2">Born: {(new Date(driver.dob || '')).toLocaleDateString()}</Typography>
									<Divider orientation="horizontal" sx={{my: 1}}/>
									<Typography variant="body1">{driver.bio?.extract}</Typography>
									<Divider orientation="horizontal" sx={{my: 1}}/>
									<WikipediaLink href={driver.url}/>
								</Grid>
							</Grid>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</Page>
	);
}