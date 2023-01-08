import {TabContext, TabList, TabPanel} from '@mui/lab';
import {Skeleton} from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import {SyntheticEvent, useEffect, useState} from 'react';
import Caxios from '../api/Caxios';
import {getAPIUrl, mapLaps} from '../api/Ergast';
import {Lap, Race} from '../types/ergast';
import LapByLap from './LapByLap';
import LapTimes from './LapTimes';

type LapByLapProps = {
	season: string;
	round: string;
	visible: boolean;
	results: Race['Results']
}

export default function Laps({season, round, visible, results}: LapByLapProps) {
	const [activeTab, setActiveTab] = useState('byLap');
	const [laps, setLaps]           = useState<Lap[]>([]);
	useEffect(() => {
		if (visible && laps.length === 0) {
			Caxios.get(getAPIUrl(`/${season}/${round}/laps.json?limit=2000`))
			      .then(mapLaps)
			      .then(laps => setLaps(laps));
		}
	}, [visible]);
	
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