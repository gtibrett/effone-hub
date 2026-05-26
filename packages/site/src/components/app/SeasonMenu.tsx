import { gql } from '@apollo/client';
import { useQuery } from "@apollo/client/react";
import {Season} from '@/gql/graphql';
import { FormControl, InputLabel, MenuItem, Select} from '@mui/material';

export const SeasonsQuery = gql`
	query SeasonMenuQuery {
		seasons(orderBy: YEAR_DESC) {
			nodes {
				id
				year
			}
		}
	}
`;

// Tailwind-only: border + hover-bg flip with OS scheme via the
// text-primary / divider tokens defined in globals.css. The
// notchedOutline override uses an arbitrary variant so we can drop sx.
const SELECT_CLASS = 'min-w-30 rounded border border-text-primary hover:bg-divider/5 [&>.MuiInputBase-root>.MuiOutlinedInput-notchedOutline]:border-0';

type SeasonMenuProps = {
	id: string;
	variant?: 'normal' | 'simple',
	season: number;
	setSeason: (season: number) => void;
	required?: boolean;
}

export default function SeasonMenu({variant = 'simple', id, season, setSeason, required = true}: SeasonMenuProps) {
	const {data, loading} = useQuery<{ seasons: { nodes: Pick<Season, 'year'>[] } }>(SeasonsQuery);

	const seasons = (data?.seasons.nodes ?? [{year: (new Date()).getFullYear()}]).map(s => s.year);

	if (!seasons.length || loading) {
		return null;
	}

	const seasonOptions = seasons.map(year => <MenuItem key={year} value={year}>{year}</MenuItem>);

	switch (variant) {
		case 'simple':
			return (
				<FormControl fullWidth className={SELECT_CLASS} size="small">
					<Select
						inputProps={{'aria-label': 'Season'}}
						className="text-inherit p-0 border-0"
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
		<FormControl fullWidth size="small">
			<Select
				inputProps={{'aria-label': 'Season'}}
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
