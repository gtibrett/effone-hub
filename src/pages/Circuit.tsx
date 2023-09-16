import {Tabs, usePageTitle} from '@gtibrett/mui-additions';
import {Backdrop, Box, Card, CardContent, CardMedia, Grid, Typography, useTheme} from '@mui/material';
import {useParams} from 'react-router';
import {useAppState} from '../app/AppStateProvider';
import History from '../circuits/History';
import Season from '../circuits/Season';
import useCircuitByRef from '../circuits/useCircuitByRef';
import CircuitMap from '../maps/CircuitMap';
import RaceMap from '../maps/RaceMap';
import useMapCircuitsToMapPoints from '../maps/useMapCircuitsToMapPoints';
import {OpenAILink, Page} from '../ui-components';

export default function Circuit() {
	const theme                  = useTheme();
	const {circuitRef}           = useParams();
	const [{currentSeason}]      = useAppState();
	const mapCircuitsToMapPoints = useMapCircuitsToMapPoints();
	const {data, loading}        = useCircuitByRef(circuitRef, currentSeason);
	
	usePageTitle(`Circuit: ${data?.circuit.name}`);
	
	if (!circuitRef) {
		throw new Error('Page Not found');
	}
	
	if (!data || loading) {
		return <Backdrop open/>;
	}
	
	const {circuit}         = data;
	const {points, onClick} = mapCircuitsToMapPoints([circuit]);
	
	return (
		<Page
			title={circuit.name}
			subheader={`${circuit.location}, ${circuit.country}`}
			action={<></>}
		>
			<Grid container spacing={2}>
				<Grid item xs={12} md={8} sx={{order: {xs: 2, md: 1}}}>
					<Card>
						<Tabs active="history" tabs={[
							{
								id:      'history', label: 'History',
								content: <History data={data} loading={loading}/>
							},
							{
								id:      'map', label: 'Circuit Map',
								content: <CircuitMap circuitRef={circuitRef} height="50vh"/>
							},
							{
								id:      'season', label: `${currentSeason} Season`,
								content: <Season data={data} loading={loading}/>
							}
						]}/>
					</Card>
				</Grid>
				
				<Grid item xs={12} md={4} sx={{order: {xs: 1, md: 2}}}>
					<Card variant="outlined">
						<CardMedia sx={{borderBottom: `1px solid ${theme.palette.divider}`}}>
							<RaceMap points={points} onClick={onClick} height={300} centerOn={circuit} zoom/>
						</CardMedia>
						{circuit.circuitDescription.description && (
							<CardContent>
								<Typography variant="body2">{circuit.circuitDescription.description}</Typography>
								<Box textAlign="right" display="block"><OpenAILink/></Box>
							</CardContent>
						)}
					</Card>
				</Grid>
			</Grid>
		</Page>
	);
}