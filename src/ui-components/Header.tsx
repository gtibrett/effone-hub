import {alpha, AppBar, FormControl, Grid, MenuItem, Select, Toolbar, Typography, useTheme} from '@mui/material';
import {useAppState} from '../app/AppStateProvider';
import Link from './Link';

export default function Header() {
	const theme                = useTheme();
	const [{season}, setState] = useAppState();
	
	const setSeason = (season: number) => {
		setState({
			season
		});
	};
	
	const sx = {
		m: 1,
		minWidth: 120,
		borderRadius: 1,
		backgroundColor: alpha(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: alpha(theme.palette.common.white, 0.25)
		},
		
		// arrow icon
		'& > .MuiInputBase-root > .MuiSvgIcon-root': {
			color: theme.palette.common.white
		},
		
		'& > .MuiInputBase-root > .MuiOutlinedInput-notchedOutline': {
			border: 0
		}
	};
	
	return (
		<header>
			<nav>
				<AppBar color="primary">
					<Toolbar>
						<Grid container spacing={2} alignItems="center">
							<Grid item>
								<Link to="/" color="inherit" sx={{textDecoration: 'none'}}><Typography variant="h3" component="h1" sx={{fontFamily: 'Racing Sans One'}}>effOne</Typography></Link>
							</Grid>
							<Grid item xs/>
							<Grid item>
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
										<MenuItem value={2022}>2022</MenuItem>
										<MenuItem value={2021}>2021</MenuItem>
									</Select>
								</FormControl>
							</Grid>
						</Grid>
					</Toolbar>
				</AppBar>
			</nav>
			<Toolbar/>
		</header>
	);
}