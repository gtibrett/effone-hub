import {Race} from '@gtibrett/effone-hub-api';
import {Box, Grid, Hidden} from '@mui/material';
import {useAppState} from '../app/AppStateProvider';
import CircuitMap from '../maps/CircuitMap';
import RaceMap from '../maps/RaceMap';
import useMapSeasonRacesToMapPoints from '../maps/useMapSeasonRacesToMapPoints';
import NextRaceCountdown from './NextRaceCountdown';

type NextRaceFeatureProps = {
	race: Race;
	mapSize?: number;
	circuitSize?: number;
}

export default function NextRaceFeature({race, mapSize = 100, circuitSize = 150}: NextRaceFeatureProps) {
	const [{currentSeason}]        = useAppState();
	const mapSeasonRacesToFeatures = useMapSeasonRacesToMapPoints();
	const {points, onClick}        = mapSeasonRacesToFeatures(currentSeason, [race]);
	
	return (
		<Grid container spacing={2} alignItems="center" justifyContent="space-evenly">
			<Hidden lgDown>
				<Grid item>
					<Box width={mapSize}>
						<RaceMap points={points} onClick={onClick} height={100} centerOn={race.Circuit?.Location} zoom/>
					</Box>
				</Grid>
			</Hidden>
			<Grid item>
				<NextRaceCountdown race={race}/>
			</Grid>
			<Hidden smDown>
				<Grid item>
					<Box maxWidth={circuitSize}>
						<CircuitMap variant="simple" circuit={race.Circuit} height={100}/>
					</Box>
				</Grid>
			</Hidden>
		</Grid>
	);
}