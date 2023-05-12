import {Card, CardContent, CardMedia, Divider, Grid, Hidden, Typography} from '@mui/material';
import {useParams} from 'react-router';
import {useAppState} from '../app/AppStateProvider';
import Circuits from '../drivers/byCircuit/Circuits';
import Career from '../drivers/Career';
import DriverAvatar from '../drivers/DriverAvatar';
import {DriverWithBio, useDriver} from '../drivers/DriverProvider';
import Season from '../drivers/Season';
import Flag from '../flags/Flag';
import {Page, Tabs, useComponentDimensionsWithRef, usePageTitle, WikipediaLink} from '../ui-components';

const DriverDetails = ({driver}: { driver: DriverWithBio }) => {
	return (
		<Grid container spacing={2} sx={{fontSize: '1.5em', fontWeight: 'bold'}} alignItems="center">
			<Grid item><Typography variant="h2">{driver.givenName} {driver.familyName}</Typography></Grid>
			<Hidden mdDown>
				<Grid item><Flag nationality={driver.nationality} size={48}/></Grid>
				<Grid item xs/>
				<Grid item>{driver.code}</Grid>
				<Grid item sx={{fontFamily: 'Racing Sans One', fontSize: '1.1em'}}>{driver.permanentNumber}</Grid>
			</Hidden>
		</Grid>
	);
};


export default function Driver() {
	const [{currentSeason}]                 = useAppState();
	const {ref, dimensions: {width}} = useComponentDimensionsWithRef();
	const {driverId}                 = useParams();
	const driver                     = useDriver(driverId);
	const driverBio                  = driver?.bio;
	
	usePageTitle(`Driver: ${driver?.givenName} ${driver?.familyName}`);
	
	if (!driver || !driverBio) {
		return null;
	}
	
	return (
		<Page title={<DriverDetails driver={driver}/>}>
			<Grid container spacing={2}>
				<Grid item xs={12} md={8} lg={9} order={{xs: 2, md: 1}}>
					<Card>
						<Tabs active="career" tabs={[
							{id: 'career', label: 'Career', content: <Career driverId={driverId}/>},
							{id: 'circuits', label: 'Circuits', content: <Circuits driverId={driverId}/>},
							{id: 'season', label: `${currentSeason} Season`, content: <Season driverId={driverId}/>}
						]}/>
					</Card>
				</Grid>
				
				<Grid item xs={12} md={4} lg={3} order={{xs: 1, md: 2}}>
					<Card variant="outlined">
						<CardMedia ref={ref}>
							<Hidden mdDown>
								<DriverAvatar id={driverId} size={width}/>
							</Hidden>
						</CardMedia>
						
						<CardContent>
							<Grid container spacing={2}>
								<Hidden mdUp>
									<Grid item><DriverAvatar id={driverId} size={128}/></Grid>
								</Hidden>
								
								<Grid item xs>
									<Typography variant="body2">Born: {(new Date(driver.dateOfBirth || '')).toLocaleDateString()}</Typography>
									<Divider orientation="horizontal" sx={{my: 1}}/>
									<Typography variant="body1">{driverBio.extract}</Typography>
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