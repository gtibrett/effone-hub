import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {alpha, Button, CardActions, Grid, Tooltip, Typography, useTheme} from '@mui/material';
import {visuallyHidden} from '@mui/utils';
import {ReactNode, SyntheticEvent} from 'react';

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