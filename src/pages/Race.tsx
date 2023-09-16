import {gql, useQuery} from '@apollo/client';
import {Race as RaceT} from '@gtibrett/effone-hub-graph-api';
import {Link, Tabs, usePageTitle} from '@gtibrett/mui-additions';
import {Backdrop, Box, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, Hidden, Typography, useTheme} from '@mui/material';
import {useParams} from 'react-router';
import RaceMap from '../maps/RaceMap';
import useMapSeasonRacesToMapPoints from '../maps/useMapSeasonRacesToMapPoints';
import Laps from '../race/Laps';
import PitStops from '../race/pitStops/PitStops';
import Podium from '../race/Podium';
import Qualifying from '../race/Qualifying';
import Results from '../race/Results';
import {OpenAILink, Page, WikipediaLink} from '../ui-components';

const raceQuery = gql`
	#graphql
	query raceBySeasonRound($season: Int!, $round: Int!) {
		races(condition: { year: $season, round: $round }) {
			name
			date
			round
			url
			summary {
				extract
			}
			circuit {
				circuitRef
				name
				location
				country
				lat
				lng
				circuitDescription {
					description
				}
			}
			results {
				driver {
					driverId
				}
				teamId
				grid
				position
				positionText
				positionOrder
				points
				laps
				time
				milliseconds
				fastestLap
				rank
				fastestLapTime
				status {
					status
				}
			}
		}
	}
`;

const setPageTitle = usePageTitle;

export default function Race() {
	const theme                    = useTheme();
	const mapSeasonRacesToFeatures = useMapSeasonRacesToMapPoints();
	const {season, round}          = useParams();
	const {data}                   = useQuery<{ races: RaceT[] }>(raceQuery, {variables: {season: Number(season), round: Number(round)}});
	
	if (!season || !round) {
		throw new Error('Page Not found');
	}
	
	const race: RaceT | undefined = data?.races[0];
	
	setPageTitle(race ? `Race: ${season} ${race.name}` : 'Race not found');
	
	if (!race) {
		return <Backdrop open/>;
	}
	
	const circuitDescription = race.circuit.circuitDescription.description || '';
	const hasResults         = Number(race.results.length) > 0;
	const {points, onClick}  = mapSeasonRacesToFeatures(season, [race].map(
		({name, round, circuit: {lng, lat}, results}) => ({name, round, lat, lng, hasResults: results?.length > 0}))
	);
	const {results}          = race;
	
	return (
		<Page
			title={race.name}
			subheader={<Typography>Round {race.round}, {(new Date(race.date || '')).toLocaleDateString()}</Typography>}
			action={hasResults && <Hidden mdDown><Podium results={results}/></Hidden>}
		>
			<Grid container spacing={2}>
				{
					hasResults
					? (
						<>
							<Grid item xs={12} order={1}>
								<Card>
									<CardContent>
										{race.summary.extract}
									</CardContent>
									<CardActions sx={{pr: 2, justifyContent: 'flex-end', marginTop: -2.5}}>
										<Box><WikipediaLink href={race.url}/></Box>
									</CardActions>
								</Card>
							</Grid>
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
											content: <Qualifying season={Number(season)} round={Number(round)}/>
										},
										{
											id:      'laps', label: 'Laps',
											content: <Laps season={Number(season)} round={Number(round)}/>
										},
										{
											id:      'pit-stops', label: 'Pit Stops',
											content: <PitStops season={Number(season)} round={Number(round)}/>
										}
									]}/>
								</Card>
							</Grid>
						</>
					)
					: (
						circuitDescription && (
							<Grid item xs={12} md={8} lg={9} order={{xs: 3, md: 1}}>
								<Card>
									<CardContent>
										<Typography variant="h5"><Link to={`/circuit/${race.circuit.circuitRef}`}>{race.circuit.name}</Link></Typography>
										<Typography variant="h6">{race.circuit.location}, {race.circuit.country}</Typography>
										<Typography variant="body2">{circuitDescription}</Typography>
										<Box textAlign="right" display="block"><OpenAILink/></Box>
									</CardContent>
								</Card>
							</Grid>
						)
					)
				}
				
				<Grid item xs={12} md={4} lg={3} order={{xs: 1, md: 3}}>
					<Card variant="outlined">
						<CardMedia sx={{borderBottom: `1px solid ${theme.palette.divider}`}}>
							<RaceMap points={points} onClick={onClick} height={200} centerOn={{lat: race.circuit.lat, lng: race.circuit.lng}} zoom/>
						</CardMedia>
						{hasResults && <CardHeader title={<Link to={`/circuit/${race.circuit.circuitRef}`}>{race.circuit.name}</Link>} subheader={<Typography>{race.circuit.location}, {race.circuit.country}</Typography>}/>}
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