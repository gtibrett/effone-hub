import {TabContext, TabList, TabPanel} from '@mui/lab';
import {visuallyHidden} from '@mui/utils';
import {Box, Card, CardContent, CardHeader, CardMedia, Divider, Grid, Hidden, Link, Tab, Typography} from '@mui/material';
import {SyntheticEvent, useRef, useState} from 'react';
import {useParams} from 'react-router';
import Career from '../drivers/Career';
import DriverAvatar from '../drivers/DriverAvatar';
import {DriverWithBio, useDriver} from '../drivers/DriverProvider';
import Season from '../drivers/Season';
import Flag from '../flags/Flag';
import useComponentDimensions from '../ui-components/useComponentDimensions';

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
	const ref                       = useRef(null);
	const {width}                   = useComponentDimensions(ref);
	const {id}                      = useParams();
	const [activeTab, setActiveTab] = useState('season');
	const driver                    = useDriver(id);
	const driverBio                 = driver?.bio;
	
	if (!driver || !driverBio) {
		return null;
	}
	
	const handleTabChange = (event: SyntheticEvent, newValue: string) => {
		setActiveTab(newValue);
	};
	
	return (
		<Card elevation={0}>
			<CardHeader
				title={<DriverDetails driver={driver}/>}
			/>
			
			<CardContent>
				<Grid container spacing={2}>
					<Grid item xs={12} md={8} lg={9} order={{xs: 2, md: 1}}>
						<Card variant="outlined">
							<TabContext value={activeTab}>
								<Box sx={{borderBottom: 1, borderColor: 'divider'}}>
									<TabList onChange={handleTabChange} aria-label="lab API tabs example">
										<Tab label="Season" value="season"/>
										<Tab label="Career" value="career"/>
									</TabList>
								</Box>
								<TabPanel value="season">
									<Season driverId={id}/>
								</TabPanel>
								<TabPanel value="career">
									<Career driverId={id}/>
								</TabPanel>
							</TabContext>
						</Card>
					</Grid>
					
					<Grid item xs={12} md={4} lg={3} order={{xs: 1, md: 2}}>
						<Card variant="outlined">
							
							<CardMedia ref={ref}>
								<Hidden mdDown>
									<DriverAvatar id={id} size={width}/>
								</Hidden>
							</CardMedia>
							
							<CardContent>
								<Grid container spacing={2}>
									<Hidden mdUp>
										<Grid item><DriverAvatar id={id} size={128}/></Grid>
									</Hidden>
									
									<Grid item xs>
										<Typography variant="body2">Born: {(new Date(driver.dateOfBirth || '')).toLocaleDateString()}</Typography>
										<Divider orientation="horizontal" sx={{my: 1}}/>
										<Typography variant="body1">{driverBio.extract}</Typography>
										<Divider orientation="horizontal" sx={{my:1}}/>
										<Link  href={driver.url} target="_blank">
											<Typography variant="caption">More info on wikipedia</Typography>
											<Typography sx={visuallyHidden}> (opens in a new window)</Typography>
										</Link>
									</Grid>
								</Grid>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
}