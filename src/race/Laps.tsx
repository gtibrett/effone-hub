import {TabContext, TabList, TabPanel} from '@mui/lab';
import {Alert, Skeleton} from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import {SyntheticEvent, useEffect, useState} from 'react';
import Caxios from '../api/Caxios';
import {getAPIUrl, mapLaps} from '../api/Ergast';
import {Lap, Race} from '../types/ergast';
import LapByLap from './lapByLap/LapByLap';
import LapByLapTable from './lapByLap/LapByLapTable';
import LapTimes from './lapTimes/LapTimes';

type LapByLapProps = {
	season: string;
	round: string;
	results: Race['Results']
}

export default function Laps({season, round, results}: LapByLapProps) {
	const [activeTab, setActiveTab] = useState('byLap');
	const [laps, setLaps]           = useState<Lap[] | undefined>();
	useEffect(() => {
		if (!laps) {
			Caxios.get(getAPIUrl(`/${season}/${round}/laps.json`), {params: {limit: 2000}})
			      .then(mapLaps)
			      .then(laps => setLaps(laps))
			      .catch(() => setLaps([]));
		}
	}, [laps, round, season]);
	
	if (!laps) {
		return <Skeleton variant="rectangular" height={400}/>;
	}
	
	if (!laps.length) {
		return <Alert variant="outlined" severity="info">Lap Data Not Available</Alert>;
	}
	
	const handleTabChange = (event: SyntheticEvent, newValue: string) => {
		setActiveTab(newValue);
	};
	
	let content = <Skeleton variant="rectangular" sx={{width: '100%'}} height="100%"/>;
	if (laps.length) {
		content = (
			<>
				<TabContext value={activeTab}>
					<Box sx={{borderBottom: 1, borderColor: 'divider'}}>
						<TabList onChange={handleTabChange} aria-label="lab API tabs example">
							<Tab label="Lap by Lap" value="byLap"/>
							<Tab label="Lap Times" value="times"/>
						</TabList>
					</Box>
					<TabPanel value="byLap">
						<LapByLap laps={laps} results={results}/>
						<LapByLapTable laps={laps} results={results}/>
					</TabPanel>
					<TabPanel value="times">
						<LapTimes laps={laps} results={results}/>
					</TabPanel>
				</TabContext>
			</>
		);
	}
	
	return content;
}