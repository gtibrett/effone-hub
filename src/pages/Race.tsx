import {TabContext, TabList, TabPanel} from '@mui/lab';
import {Backdrop, Card, CardContent, CardHeader, CardMedia, Grid, Typography} from '@mui/material';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import {SyntheticEvent, useEffect, useState} from 'react';
import {useParams} from 'react-router';
import Caxios from '../api/Caxios';
import {getAPIUrl, mapRace} from '../api/Ergast';
import Laps from '../race/Laps';
import Podium from '../race/Podium';
import Qualifying from '../race/Qualifying';
import Results from '../race/Results';
import RaceMap from '../schedule/RaceMap';
import {Race as RaceT, Responses} from '../types/ergast';

type RaceState = {
	race?: RaceT;
	activeTab: string;
}

export default function Race() {
	const {season, round}   = useParams();
	const [state, setState] = useState<RaceState>({
		race: undefined,
		activeTab: 'race'
	});
	
	const handleTabChange = (event: SyntheticEvent, newValue: string) => {
		setState(cur => ({...cur, activeTab: newValue}));
	};
	
	useEffect(() => {
		if (season && round) {
			Caxios.get<Responses['ResultsByYearResponse']>(getAPIUrl(`/${season}/${round}/results.json?limit=2000`))
			      .then(mapRace)
			      .then(data => {
				      setState(cur => ({...cur, race: data}));
			      });
		}
	}, [season, round, setState]);
	
	if (!season || !round) {
		throw new Error('Page Not found');
	}
	
	if (!state.race) {
		return <Backdrop open/>;
	}
	
	return (
		<Card elevation={0}>
			<CardHeader title={state.race.raceName} subheader={<>
				<Typography>Round {state.race.round}, {(new Date(state.race.date || '')).toLocaleDateString()}</Typography>
			</>}
			            action={<Podium results={state.race.Results}/>}
			/>
			
			<CardContent>
				<Grid container spacing={2}>
					<Grid item xs={9}>
						<Card variant="outlined">
							<TabContext value={state.activeTab}>
								<Box sx={{borderBottom: 1, borderColor: 'divider'}}>
									<TabList onChange={handleTabChange} aria-label="lab API tabs example">
										<Tab label="Race" value="race"/>
										<Tab label="Qualifying" value="qualifying"/>
										<Tab label="Laps" value="laps"/>
									</TabList>
								</Box>
								<TabPanel value="race">
									<Results results={state.race.Results}/>
								</TabPanel>
								<TabPanel value="qualifying">
									<Qualifying season={season} round={round}/>
								</TabPanel>
								<TabPanel value="laps">
									<Laps season={season} round={round} results={state.race.Results}/>
								</TabPanel>
							</TabContext>
						</Card>
					</Grid>
					
					<Grid item xs={3}>
						<Card variant="outlined">
							<CardMedia><RaceMap season={season} races={[state.race]} height={300} centerOn={state.race.Circuit?.Location} zoom/></CardMedia>
							<CardHeader title={state.race.Circuit?.circuitName} subheader={<Typography>{state.race.Circuit?.Location?.locality}, {state.race.Circuit?.Location?.country}</Typography>}/>
						</Card>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
}