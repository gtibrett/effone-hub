import {TabContext, TabList, TabPanel} from '@mui/lab';
import {Card, CardContent, CardHeader, CardMedia, Divider, Grid, Typography} from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import {SyntheticEvent, useRef, useState} from 'react';
import {useParams} from 'react-router';
import DriverAvatar from '../drivers/DriverAvatar';
import {DriverWithBio, useDriver} from '../drivers/DriverProvider';
import Flag from '../flags/Flag';
import useComponentDimensions from '../ui-components/useComponentDimensions';

const DriverDetails = ({driver}: { driver: DriverWithBio }) => {
	return (
		<Grid container spacing={4} sx={{fontSize: '1.5em', fontWeight: 'bold'}} alignItems="center">
			<Grid item><Typography variant="h2">{driver.givenName} {driver.familyName}</Typography></Grid>
			<Grid item><Flag nationality={driver.nationality} size={48}/></Grid>
			<Grid item xs/>
			<Grid item>{driver.code}</Grid>
			<Grid item sx={{fontFamily: 'Racing Sans One', fontSize: '1.1em'}}>{driver.permanentNumber}</Grid>
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
					<Grid item xs={9}>
						<Card variant="outlined">
							<TabContext value={activeTab}>
								<Box sx={{borderBottom: 1, borderColor: 'divider'}}>
									<TabList onChange={handleTabChange} aria-label="lab API tabs example">
										<Tab label="Season" value="season"/>
										<Tab label="Career" value="career"/>
									</TabList>
								</Box>
								<TabPanel value="season">
								
								</TabPanel>
								<TabPanel value="career">
								</TabPanel>
							</TabContext>
						</Card>
					</Grid>
					
					<Grid item xs={3}>
						<Card variant="outlined">
							<CardMedia ref={ref}>
								<DriverAvatar id={id} size={width}/>
							</CardMedia>
							<CardContent>
								<Typography variant="body2">Born: {(new Date(driver.dateOfBirth || '')).toLocaleDateString()}</Typography>
								<Divider orientation="horizontal" sx={{my:1}}/>
								<Typography variant="body1">{driverBio.extract}</Typography>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
}