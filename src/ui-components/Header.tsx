import {AppBar, Grid, Toolbar, Typography} from '@mui/material';
import SeasonMenu from '../schedule/SeasonMenu';
import Link from './Link';

export default function Header() {
	
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
							<Grid item><SeasonMenu/></Grid>
						</Grid>
					</Toolbar>
				</AppBar>
			</nav>
			<Toolbar/>
		</header>
	);
}