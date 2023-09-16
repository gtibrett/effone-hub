import {gql, useQuery} from '@apollo/client';
import {alpha, FormControl, InputLabel, MenuItem, Select, useTheme} from '@mui/material';
import {Season} from "@gtibrett/effone-hub-graph-api";

export const SeasonsQuery = gql`
	query seasons {
		seasons {
			year
		}
	}
`;

const useSelectSx = () => {
	const theme = useTheme();
	
	return {
		m:            0,
		minWidth:     120,
		borderRadius: 1,
		border:       `1px solid ${theme.palette.text.primary}`,
		'&:hover':    {
			backgroundColor: alpha(theme.palette.divider, 0.05)
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
	const sx              = useSelectSx();
	const {data, loading} = useQuery<{ seasons: Season[] }>(SeasonsQuery);
	
	const seasons = (data?.seasons || [{year: (new Date()).getFullYear()}]).map(s => s.year);
	seasons.sort();
	seasons.reverse();
	
	if (!seasons.length || loading) {
		return null;
	}
	
	const seasonOptions = seasons.map(year => <MenuItem key={year} value={year}>{year}</MenuItem>);
	
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
						{seasonOptions}
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
						{seasonOptions}
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
				{seasonOptions}
			</Select>
		</FormControl>
	);
}