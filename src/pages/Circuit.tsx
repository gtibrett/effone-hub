import {TabContext, TabList, TabPanel} from '@mui/lab';
import {Backdrop, Box, Card, CardContent, CardHeader, Grid, Paper, Tab, Typography} from '@mui/material';
import {SyntheticEvent, useEffect, useState} from 'react';
import {useParams} from 'react-router';
import Caxios from '../api/Caxios';
import {getCircuitDescription} from '../api/effone';
import {getAPIUrl, mapCircuits} from '../api/Ergast';
import {useAppState} from '../app/AppStateProvider';
import CircuitMap from '../circuits/CircuitMap';
import History from '../circuits/History';
import Season from '../circuits/Season';
import {Circuit as CircuitT, Responses} from '../types/ergast';
import OpenAILink from '../ui-components/citations/OpenAILink';
import Link from '../ui-components/Link';
import Navigation from '../ui-components/Navigation';

type CircuitState = {
	circuit?: CircuitT;
	activeTab: string;
}

export default function Circuit() {
	const [{season}]        = useAppState();
	const {circuitId}       = useParams();
	const [state, setState] = useState<CircuitState>({
		circuit: undefined,
		activeTab: 'season'
	});
	
	const handleTabChange = (event: SyntheticEvent, newValue: string) => {
		setState(cur => ({...cur, activeTab: newValue}));
	};
	
	useEffect(() => {
		if (circuitId) {
			Caxios.get<Responses['CircuitsResponse']>(getAPIUrl(`/circuits/${circuitId}.json`), {params: {limit: 100}})
			      .then(mapCircuits)
			      .then(data => {
				      setState(cur => ({...cur, circuit: data?.[0]}));
			      });
		}
	}, [circuitId, setState]);
	
	if (!circuitId) {
		throw new Error('Page Not found');
	}
	
	if (!state.circuit) {
		return <Backdrop open/>;
	}
	
	const circuitDescription = getCircuitDescription(state.circuit.circuitId) || '';
	
	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Navigation>
					<Link to="/">{season} Season</Link>
					<Typography>{state.circuit.circuitName}</Typography>
				</Navigation>
			</Grid>
			
			<Grid item xs={12}>
				<Card elevation={0}>
					<CardHeader title={state.circuit.circuitName} subheader={<Typography>{state.circuit.Location?.locality}, {state.circuit.Location?.country}</Typography>}/>
					
					<CardContent>
						<Grid container spacing={2}>
							<Grid item xs={12} md={4} lg={3}>
								<Paper variant="outlined"><CircuitMap circuits={[state.circuit]} height={200} centerOn={state.circuit.Location} zoom/></Paper>
							</Grid>
							<Grid item xs={12} md={4} lg={9}>
								{circuitDescription && (
									<CardContent>
										<Typography variant="body2">{circuitDescription}</Typography>
										<Box textAlign="right" display="block"><OpenAILink/></Box>
									</CardContent>
								)}
							</Grid>
							
							<Grid item xs={12}>
								<Paper variant="outlined">
									<TabContext value={state.activeTab}>
										<Box sx={{borderBottom: 1, borderColor: 'divider'}}>
											<TabList onChange={handleTabChange} aria-label="lab API tabs example">
												<Tab label={season} value="season"/>
												<Tab label="History" value="history"/>
											</TabList>
										</Box>
										<TabPanel value="season">
											<Season circuitId={circuitId}/>
										</TabPanel>
										<TabPanel value="history">
											<History circuitId={circuitId}/>
										</TabPanel>
									</TabContext>
								</Paper>
							</Grid>
						</Grid>
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	);
}