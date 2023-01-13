import {alpha, FormControl, MenuItem, Select, useTheme} from '@mui/material';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router';
import {getAPIUrl} from '../api/Ergast';
import {useAppState} from '../app/AppStateProvider';
import {Responses} from '../types/ergast';

const useSelectSx = () => {
	const theme = useTheme();
	
	return {
		m: 0,
		minWidth: 120,
		borderRadius: 1,
		backgroundColor: alpha(theme.palette.common.white, 0.25),
		border: `1px solid ${alpha(theme.palette.common.white, .5)}`,
		'&:hover': {
			backgroundColor: alpha(theme.palette.common.white, 0.3)
		},
		
		// arrow icon
		'& > .MuiInputBase-root > .MuiSvgIcon-root': {
			color: theme.palette.common.white
		},
		
		'& > .MuiInputBase-root > .MuiOutlinedInput-notchedOutline': {
			border: 0
		}
	};
};

export default function SeasonMenu() {
	const navigate              = useNavigate();
	const sx                    = useSelectSx();
	const [{season}, setState]  = useAppState();
	const [seasons, setSeasons] = useState<number[]>([]);
	
	const setSeason = (season: number) => {
		setState({
			season
		});
		
		navigate('/');
	};
	
	useEffect(() => {
		if (!seasons.length) {
			axios.get<Responses['SeasonsResponse']>(getAPIUrl('/seasons.json'), {params: {limit: 100}})
			     .then(response => response.data.MRData?.SeasonTable?.Seasons || [{season: (new Date()).getFullYear()}])
			     .then((seasons) => {
				     seasons.sort();
				     seasons.reverse();
				     return seasons;
			     })
			     .then((seasons) => setSeasons(seasons.map(s => Number(s.season))));
		}
	}, [seasons, setSeasons]);
	
	return (
		<FormControl fullWidth sx={sx} size="small">
			<Select
				inputProps={{'aria-label': 'Season'}}
				sx={{color: 'inherit', p: 0, border: 0}}
				labelId="season-label"
				id="season-select"
				value={season}
				label="Season"
				onChange={(ev) => setSeason(ev.target.value as number)}
			>
				{seasons.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
			</Select>
		</FormControl>
	);
}