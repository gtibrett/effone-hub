import {Response} from 'express';
import {downloadData} from '../utility/Download';
import CircuitsLoader from './CircuitsLoader';
import DriversLoader from './DriversLoader';
import DriverStandingsLoader from './DriverStandingsLoader';
import LapTimesLoader from './LapTimesLoader';
import PitStopsLoader from './PitStopsLoader';
import QualifyingLoader from './QualifyingLoader';
import RacesLoader from './RacesLoader';
import ResultsLoader from './ResultsLoader';
import SeasonsLoader from './SeasonsLoader';
import SprintResultsLoader from './SprintResultsLoader';
import StatusesLoader from './StatusesLoader';
import TeamResultsLoader from './TeamResultsLoader';
import TeamsLoader from './TeamsLoader';
import TeamStandingsLoader from './TeamStandingsLoader';

export {default as CircuitLoader} from './CircuitsLoader';
export {default as DriverLoader} from './DriversLoader';
export {default as DriverStandingsLoader} from './DriverStandingsLoader';
export {default as LapTimesLoader} from './LapTimesLoader';
export {default as PitStopsLoader} from './PitStopsLoader';
export {default as QualifyingLoader} from './QualifyingLoader';
export {default as RacesLoader} from './RacesLoader';
export {default as ResultsLoader} from './ResultsLoader';
export {default as SeasonsLoader} from './SeasonsLoader';
export {default as SprintResultsLoader} from './SprintResultsLoader';
export {default as StatusLoader} from './StatusesLoader';
export {default as TeamResultsLoader} from './TeamResultsLoader';
export {default as TeamsLoader} from './TeamsLoader';
export {default as TeamStandingsLoader} from './TeamStandingsLoader';

export async function EverythingLoader(res: Response | false) {
	return await downloadData()
		.then(async () => {
			const results = {
				// Ref
				seasons:  await SeasonsLoader(false),
				statuses: await StatusesLoader(false),
				circuits: await CircuitsLoader(false),
				teams:    await TeamsLoader(false),
				drivers:  await DriversLoader(false),
				
				// Race dependent
				races:         await RacesLoader(false),
				qualifying:    await QualifyingLoader(false),
				sprintResults: await SprintResultsLoader(false),
				lapTimes:      await LapTimesLoader(false),
				pitStops:      await PitStopsLoader(false),
				results:       await ResultsLoader(false),
				teamResults:   await TeamResultsLoader(false),
				
				// Standings
				driverStandings: await DriverStandingsLoader(false),
				teamStandings:   await TeamStandingsLoader(false)
			};
			
			if (res) {
				res.json({status: 'success', ...results});
			}
			
			return results;
		})
		.catch(error => {
			if (res) {
				res.json({status: 'error', error});
			}
			
			return error;
		});
}