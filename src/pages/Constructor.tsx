import {Card, CardContent, CardMedia, Divider, Grid, Typography} from '@mui/material';
import Box from '@mui/material/Box';
import {useRef} from 'react';
import {useParams} from 'react-router';
import {useAppState} from '../app/AppStateProvider';
import {ConstructorWithBio, useConstructor} from '../constructors/ConstructorProvider';
import History from '../constructors/History';
import Season from '../constructors/Season';
import useGetColorByConstructorId from '../constructors/useGetColorByConstructorId';
import Flag from '../flags/Flag';
import {Page, Tabs, usePageTitle, WikipediaLink} from '../ui-components';

const ConstructorDetails = ({constructor}: { constructor: ConstructorWithBio }) => {
	return (
		<Grid container spacing={4} sx={{fontSize: '1.5em', fontWeight: 'bold'}} alignItems="center">
			<Grid item><Typography variant="h2">{constructor.name}</Typography></Grid>
			<Grid item><Flag nationality={constructor.nationality} size={48}/></Grid>
		</Grid>
	);
};


export default function Constructor() {
	const [{currentSeason}]       = useAppState();
	const getColorByConstructorId = useGetColorByConstructorId();
	const ref                     = useRef(null);
	const {constructorId}         = useParams();
	const constructor             = useConstructor(constructorId);
	const constructorBio          = constructor?.bio;
	
	usePageTitle(`Constructor: ${constructor?.name}`);
	
	if (!constructor || !constructorBio) {
		return null;
	}
	
	return (
		<Page
			// constructor is a keyword, so using it as a prop is problematic
			// @ts-ignore
			title={<ConstructorDetails constructor={constructor}/>}
		>
			
			<Grid container spacing={2}>
				<Grid item xs={12} md={8} lg={9} order={{xs: 2, md: 1}}>
					<Card variant="outlined">
						<Tabs active="history" tabs={[
							{
								id:      'history', label: 'History',
								content: <History constructorId={constructor.constructorId}/>
							},
							{
								id:      'season', label: `${currentSeason} Season`,
								content: <Season constructorId={constructor.constructorId}/>
							}
						]}/>
					</Card>
				</Grid>
				
				<Grid item xs={12} md={4} lg={3} order={{xs: 1, md: 2}}>
					<Card variant="outlined">
						<CardMedia ref={ref}>
							<Box sx={{height: {xs: 24, md: 48}, background: getColorByConstructorId(constructor.constructorId, true)}}/>
						</CardMedia>
						<CardContent>
							<Typography variant="body1">{constructorBio.extract}</Typography>
							<Divider orientation="horizontal" sx={{my: 1}}/>
							<WikipediaLink href={constructor.url}/>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</Page>
	);
}