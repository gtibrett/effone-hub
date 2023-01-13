import {faFlagCheckered} from '@fortawesome/pro-duotone-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {AppBar, Grid, Toolbar, Typography, useTheme} from '@mui/material';
import SeasonMenu from '../schedule/SeasonMenu';
import Link from './Link';

export default function Header() {
	const theme = useTheme();
	
	return (
		<header>
			<nav>
				<AppBar color="primary" sx={{background: theme.palette.primary.dark}}>
					<Toolbar>
						<Grid container spacing={2} alignItems="center">
							<Grid item><FontAwesomeIcon icon={faFlagCheckered} size="3x" aria-hidden/></Grid>
							<Grid item>
								<Link to="/" color="inherit" sx={{textDecoration: 'none'}}><Typography variant="h3" component="h1" sx={{fontFamily: 'Racing Sans One'}}>effOne Hub</Typography></Link>
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