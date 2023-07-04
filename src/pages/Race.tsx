import {Race as RaceT, Responses, Result} from '@gtibrett/effone-hub-api';
import {Link, Tabs, usePageTitle} from '@gtibrett/mui-additions';
import {Backdrop, Box, Card, CardContent, CardHeader, CardMedia, Grid, Hidden, Typography, useTheme} from '@mui/material';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router';
import Caxios from '../api/Caxios';
import {getAPIUrl, mapRace, mapSchedule} from '../api/Ergast';
import getCircuitDescription from '../api/getCircuitDescription';
import RaceMap from '../maps/RaceMap';
import useMapCircuitsToMapPoints from '../maps/useMapCircuitsToMapPoints';
import Laps from '../race/Laps';
import PitStops from '../race/pitStops/PitStops';
import Podium from '../race/Podium';
import Qualifying from '../race/Qualifying';
import Results from '../race/Results';
import {OpenAILink, Page} from '../ui-components';

export default function Race() {
	const theme                  = useTheme();
	const mapCircuitsToMapPoints = useMapCircuitsToMapPoints();
	const {season, round}        = useParams();
	const [race, setRace]        = useState<RaceT | undefined>(undefined);
	const [results, setResults]  = useState<Result[] | undefined>(undefined);
	
	usePageTitle(`Race: ${race?.season} ${race?.raceName}`);
	
	useEffect(() => {
		if (season && round) {
			Caxios.get<Responses.ResultsResponse>(getAPIUrl(`/${season}/${round}.json`), {params: {limit: 2000}})
			      .then(mapSchedule)
			      .then(data => {
				      setRace(data[0]);
			      });
		}
	}, [season, round]);
	
	useEffect(() => {
		if (season && round) {
			Caxios.get<Responses.ResultsResponse>(getAPIUrl(`/${season}/${round}/results.json`), {params: {limit: 2000}})
			      .then(mapRace)
			      .then(data => {
				      setResults(data?.Results);
			      })
			      .catch(() => {
				      setResults([]);
			      });
		}
	}, [season, round]);
	
	if (!season || !round) {
		throw new Error('Page Not found');
	}
	
	if (!race) {
		return <Backdrop open/>;
	}
	
	const circuitDescription = getCircuitDescription(race.Circuit?.circuitId) || '';
	const {points, onClick}  = mapCircuitsToMapPoints([race.Circuit]);
	const hasResults         = Number(results?.length) > 0;
	
	return (
		<Page
			title={race.raceName}
			subheader={<>
				<Typography>Round {race.round}, {(new Date(race.date || '')).toLocaleDateString()}</Typography>
			</>}
			action={hasResults && <Hidden mdDown><Podium results={results}/></Hidden>}
		>
			
			<Grid container spacing={2}>
				{
					hasResults
					? (
						<>
							<Hidden mdUp>
								<Grid item xs={12} order={2}><Podium results={results}/></Grid>
							</Hidden>
							
							<Grid item xs={12} md={8} lg={9} order={{xs: 3, md: 1}}>
								<Card>
									<Tabs active="race" tabs={[
										{
											id:      'race', label: 'Race',
											content: <Results results={results}/>
										},
										{
											id:      'quali', label: 'Qualifying',
											content: <Qualifying season={season} round={round}/>
										},
										{
											id:      'laps', label: 'Laps',
											content: <Laps season={season} round={round} results={results}/>
										},
										{
											id:      'pit-stops', label: 'Pit Stops',
											content: results ? <PitStops season={season} round={round} results={results}/> : ''
										}
									]}/>
								</Card>
							</Grid>
						</>
					)
					: (
						circuitDescription && (
							<Grid item xs={12} md={8} lg={9} order={{xs: 3, md: 1}}>
								<Typography variant="h5"><Link to={`/circuit/${race.Circuit?.circuitId}`}>{race.Circuit?.circuitName}</Link></Typography>
								<Typography variant="h6">{race.Circuit?.Location?.locality}, {race.Circuit?.Location?.country}</Typography>
								<Typography variant="body2">{circuitDescription}</Typography>
								<Box textAlign="right" display="block"><OpenAILink/></Box>
							</Grid>
						)
					)
				}
				
				<Grid item xs={12} md={4} lg={3} order={{xs: 1, md: 3}}>
					<Card variant="outlined">
						<CardMedia sx={{borderBottom: `1px solid ${theme.palette.divider}`}}>
							<RaceMap points={points} onClick={onClick} height={200} centerOn={race.Circuit?.Location} zoom/>
						</CardMedia>
						{hasResults && <CardHeader title={<Link to={`/circuit/${race.Circuit?.circuitId}`}>{race.Circuit?.circuitName}</Link>} subheader={<Typography>{race.Circuit?.Location?.locality}, {race.Circuit?.Location?.country}</Typography>}/>}
						{hasResults && circuitDescription && (
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