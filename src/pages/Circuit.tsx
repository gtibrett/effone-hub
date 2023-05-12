import {Circuit as CircuitT, Responses} from '@gtibrett/effone-hub-api';
import {Backdrop, Box, Card, CardContent, CardMedia, Grid, Typography, useTheme} from '@mui/material';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router';
import Caxios from '../api/Caxios';
import {getAPIUrl, mapCircuits} from '../api/Ergast';
import getCircuitDescription from '../api/getCircuitDescription';
import {useAppState} from '../app/AppStateProvider';
import History from '../circuits/History';
import Season from '../circuits/Season';
import CircuitMap from '../maps/CircuitMap';
import RaceMap from '../maps/RaceMap';
import useMapCircuitsToMapPoints from '../maps/useMapCircuitsToMapPoints';
import {OpenAILink, Page, Tabs, usePageTitle} from '../ui-components';

export default function Circuit() {
	const theme                  = useTheme();
	const {circuitId}            = useParams();
	const [{currentSeason}]      = useAppState();
	const mapCircuitsToMapPoints = useMapCircuitsToMapPoints();
	const [circuit, setCircuit]  = useState<CircuitT | undefined>(undefined);
	
	usePageTitle(`Circuit: ${circuit?.circuitName}`);
	
	useEffect(() => {
		if (circuitId) {
			Caxios.get<Responses.CircuitResponse>(getAPIUrl(`/circuits/${circuitId}.json`), {params: {limit: 100}})
			      .then(mapCircuits)
			      .then(data => {
				      setCircuit(data?.[0]);
			      });
		}
	}, [circuitId]);
	
	if (!circuitId) {
		throw new Error('Page Not found');
	}
	
	if (!circuit) {
		return <Backdrop open/>;
	}
	
	const circuitDescription = getCircuitDescription(circuit.circuitId) || '';
	const {points, onClick}  = mapCircuitsToMapPoints([circuit]);
	
	return (
		<Page
			title={circuit.circuitName}
			subheader={`${circuit.Location?.locality}, ${circuit.Location?.country}`}
		>
			<Grid container spacing={2}>
				<Grid item xs={12} md={8} sx={{order: {xs: 2, md: 1}}}>
					<Card>
						<Tabs active="history" tabs={[
							{
								id:      'history', label: 'History',
								content: <History circuitId={circuitId}/>
							},
							{
								id:      'map', label: 'Circuit Map',
								content: <CircuitMap circuit={circuit} height="50vh"/>
							},
							{
								id:      'season', label: `${currentSeason} Season`,
								content: <Season circuitId={circuitId}/>
							}
						]}/>
					</Card>
				</Grid>
				
				<Grid item xs={12} md={4} sx={{order: {xs: 1, md: 2}}}>
					<Card variant="outlined">
						<CardMedia sx={{borderBottom: `1px solid ${theme.palette.divider}`}}>
							<RaceMap points={points} onClick={onClick} height={300} centerOn={circuit.Location} zoom/>
						</CardMedia>
						{circuitDescription && (
							<CardContent>
								<Typography variant="body2">{circuitDescription}</Typography>
								<Box textAlign="right" display="block"><OpenAILink/></Box>
							</CardContent>
						)}
					</Card>
				</Grid>
			</Grid>
		</Page>
	);
}