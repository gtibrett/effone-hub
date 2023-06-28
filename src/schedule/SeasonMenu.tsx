import {Responses} from '@gtibrett/effone-hub-api';
import {alpha, FormControl, InputLabel, MenuItem, Select, useTheme} from '@mui/material';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {getAPIUrl} from '../api/Ergast';

const useSelectSx = () => {
	const theme = useTheme();
	
	return {
		m: 0,
		minWidth: 120,
		borderRadius: 1,
		border: `1px solid ${theme.palette.text.primary}`,
		'&:hover': {
			backgroundColor: alpha(theme.palette.divider, 0.05)
		},
		
		// arrow icon
		'& > .MuiInputBase-root > .MuiSvgIcon-root': {
			// color: theme.palette.common.white
		},
		
		'& > .MuiInputBase-root > .MuiOutlinedInput-notchedOutline': {
			border: 0
		}
	};
};

type SeasonMenuProps = {
	id: string;
	variant?: 'normal' | 'simple',
	season: number;
	setSeason: (season: number) => void;
	required?: boolean;
}

export default function SeasonMenu({variant = 'simple', id, season, setSeason, required = true}: SeasonMenuProps) {
	const sx                    = useSelectSx();
	const [seasons, setSeasons] = useState<number[]>([]);
	
	useEffect(() => {
		if (!seasons.length) {
			axios.get<Responses.SeasonResponse>(getAPIUrl('/seasons.json'), {params: {limit: 100}})
			     .then(response => response.data.MRData?.SeasonTable?.Seasons || [{season: (new Date()).getFullYear()}])
			     .then((seasons) => {
				     seasons.sort();
				     seasons.reverse();
				     return seasons;
			     })
			     .then((seasons) => setSeasons(seasons.map(s => Number(s.season))));
		}
	}, [seasons, setSeasons]);
	
	if (!seasons.length) {
		return null;
	}
	
	switch (variant) {
		case 'simple':
			return (
				<FormControl fullWidth sx={sx} size="small">
					<Select
						inputProps={{'aria-label': 'Season'}}
						sx={{color: 'inherit', p: 0, border: 0}}
						id={id}
						value={season}
						label="Season"
						onChange={(ev) => setSeason(ev.target.value as number)}
					>
						{!required && <MenuItem value={-1}>Any</MenuItem>}
						{seasons.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
					</Select>
				</FormControl>
			);
		
		case 'normal':
			return (
				<FormControl fullWidth size="small" variant="outlined">
					<InputLabel id={`${id}-label`}>Season</InputLabel>
					<Select
						label="Season"
						labelId={`${id}-label`}
						id={id}
						value={season}
						onChange={(ev) => setSeason(ev.target.value as number)}
					>
						{!required && <MenuItem value={-1}>Any</MenuItem>}
						{seasons.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
					</Select>
				</FormControl>
			);
	}
	
	return (
		<FormControl fullWidth sx={variant === 'simple' ? sx : undefined} size="small">
			
			<Select
				inputProps={{'aria-label': 'Season'}}
				sx={variant === 'simple' ? {color: 'inherit', p: 0, border: 0} : undefined}
				id={id}
				value={season}
				label="Season"
				onChange={(ev) => setSeason(ev.target.value as number)}
			>
				{seasons.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
			</Select>
		</FormControl>
	);
}