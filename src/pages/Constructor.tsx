import {TabContext, TabList, TabPanel} from '@mui/lab';
import {Card, CardContent, CardHeader, CardMedia, Divider, Grid, Typography} from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import {SyntheticEvent, useRef, useState} from 'react';
import {useParams} from 'react-router';
import {ConstructorWithBio, useConstructor} from '../constructors/ConstructorProvider';
import DriverAvatar from '../drivers/DriverAvatar';
import Flag from '../flags/Flag';
import useComponentDimensions from '../ui-components/useComponentDimensions';

const ConstructorDetails = ({constructor}: { constructor: ConstructorWithBio }) => {
	return (
		<Grid container spacing={4} sx={{fontSize: '1.5em', fontWeight: 'bold'}} alignItems="center">
			<Grid item><Typography variant="h2">{constructor.name}</Typography></Grid>
			<Grid item><Flag nationality={constructor.nationality} size={48}/></Grid>
		</Grid>
	);
};


export default function Constructor() {
	const ref                       = useRef(null);
	const {width}                   = useComponentDimensions(ref);
	const {id}                      = useParams();
	const [activeTab, setActiveTab] = useState('season');
	const constructor               = useConstructor(id);
	const constructorBio            = constructor?.bio;
	
	if (!constructor || !constructorBio) {
		return null;
	}
	
	const handleTabChange = (event: SyntheticEvent, newValue: string) => {
		setActiveTab(newValue);
	};
	
	return (
		<Card elevation={0}>
			<CardHeader
				// constructor is a keyword, so using it as a prop is problematic
				// @ts-ignore
				title={<ConstructorDetails constructor={constructor}/>}
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
								<Typography variant="body1">{constructorBio.extract}</Typography>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
}