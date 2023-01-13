import {TabContext, TabList, TabPanel} from '@mui/lab';
import {Card, CardContent, CardHeader, CardMedia, Divider, Grid, Link, Typography} from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import {visuallyHidden} from '@mui/utils';
import {SyntheticEvent, useRef, useState} from 'react';
import {useParams} from 'react-router';
import {getColorByConstructorId} from '../constructors';
import {ConstructorWithBio, useConstructor} from '../constructors/ConstructorProvider';
import History from '../constructors/History';
import Season from '../constructors/Season';
import Flag from '../flags/Flag';

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
					<Grid item xs={12} md={8} lg={9} order={{xs: 2, md: 1}}>
						<Card variant="outlined">
							<TabContext value={activeTab}>
								<Box sx={{borderBottom: 1, borderColor: 'divider'}}>
									<TabList onChange={handleTabChange} aria-label="lab API tabs example">
										<Tab label="Season" value="season"/>
										<Tab label="History" value="history"/>
									</TabList>
								</Box>
								<TabPanel value="season">
									<Season constructorId={constructor.constructorId}/>
								</TabPanel>
								<TabPanel value="history">
									<History constructorId={constructor.constructorId}/>
								</TabPanel>
							</TabContext>
						</Card>
					</Grid>
					
					<Grid item xs={12} md={4} lg={3} order={{xs: 1, md: 2}}>
						<Card variant="outlined">
							<CardMedia ref={ref}>
								<Box sx={{height: {xs: 24, md: 48}, background: getColorByConstructorId(constructor.constructorId)}}/>
							</CardMedia>
							<CardContent>
								<Typography variant="body1">{constructorBio.extract}</Typography>
								<Divider orientation="horizontal" sx={{my:1}}/>
								<Link  href={constructor.url} target="_blank">
									<Typography variant="caption">More info on wikipedia</Typography>
									<Typography sx={visuallyHidden}> (opens in a new window)</Typography>
								</Link>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
}