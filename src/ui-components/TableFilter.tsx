import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {alpha, Button, CardActions, Grid, Tooltip, Typography, useTheme} from '@mui/material';
import {visuallyHidden} from '@mui/utils';
import {ChangeEvent, Dispatch, ReactNode, SetStateAction, SyntheticEvent} from 'react';

type TableFilterProps = {
	handleSearch: (e: SyntheticEvent) => void;
	children: ReactNode | ReactNode[];
}

export default function TableFilter({handleSearch, children}: TableFilterProps) {
	const theme = useTheme();
	
	return (
		<form onSubmit={handleSearch}>
			<CardActions sx={{p: 2, borderBottom: `4px solid ${theme.palette.secondary.main}`, background: alpha(theme.palette.background.default, .125)}}>
				<Grid container spacing={1}>
					{Array.isArray(children) ? children.map((c, i) => <Grid key={i} item xs>{c}</Grid>) : <Grid item xs>{children}</Grid>}
					<Grid item>
						<Tooltip title="Search" arrow placement="bottom">
							<Button color="secondary" type="submit" variant="contained" onClick={handleSearch}><FontAwesomeIcon icon={faMagnifyingGlass} style={{fontSize: 26}}/><Typography sx={visuallyHidden}>Search</Typography></Button>
						</Tooltip>
					</Grid>
				</Grid>
			</CardActions>
		</form>
	);
}

export type ListFiltersProps<T> = {
	filters: T;
	setFilters: Dispatch<SetStateAction<T>>;
}

export function setNumberFilter<T>(setFilters: Dispatch<SetStateAction<T>>, key: keyof T) {
	return (value: number) => {
		setFilters((cur: T) => ({
			...cur,
			[key]: value
		}) as T);
	};
}

export function setStringFilter<T>(setFilters: Dispatch<SetStateAction<T>>, key: keyof T) {
	return (ev: ChangeEvent<HTMLInputElement>) => {
		setFilters((cur: T) => ({
			...cur,
			[key]: (ev.target.value || '' as string)
		}) as T);
	};
}

type FilterComparator<Q, T = any> = (query: Q, datum: T) => boolean;

export function filterByNumber<T extends {}>(data: T[], query: number, fields: (keyof T)[]): T[];
export function filterByNumber<T extends {}>(data: T[], query: number, comparator: FilterComparator<number, T>): T[];
export function filterByNumber<T extends {}>(data: T[], query: number, fieldsOrComparator: (keyof T)[] | FilterComparator<number, T>) {
	if (typeof fieldsOrComparator === 'function') {
		return data.filter(d => fieldsOrComparator(query, d));
	} else {
		if (typeof fieldsOrComparator === 'undefined') {
			throw new Error('Fields are required');
		} else {
			return data.filter(d => {
				for (const field of fieldsOrComparator) {
					if (d.hasOwnProperty(field)) {
						if (Number(d[field]) === query) {
							return true;
						}
					}
				}
				return false;
			});
		}
	}
}

export function filterByFreeformText<T extends {}>(data: T[], query: string, fields: (keyof T)[]): T[];
export function filterByFreeformText<T extends {}>(data: T[], query: string, comparator: FilterComparator<string, T>): T[];
export function filterByFreeformText<T extends {}>(data: T[], query: string, fieldsOrComparator: (keyof T)[] | FilterComparator<string, T>) {
	if (typeof fieldsOrComparator === 'function') {
		return data.filter(d => fieldsOrComparator(query, d));
	} else {
		if (typeof fieldsOrComparator === 'undefined') {
			throw new Error('Fields are required');
		} else {
			const tokens = query.toLowerCase().split(' ');
			
			return data.filter(d => {
				const textToSearch = fieldsOrComparator.reduce((txt, field) => `${txt} ${d[field]}`, '');
				for (const token of tokens) {
					if (textToSearch.toLowerCase().includes(token)) {
						return true;
					}
				}
				return false;
			});
		}
	}
};