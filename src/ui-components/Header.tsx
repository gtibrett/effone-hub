import {faFlagCheckered} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {AppBar, Grid, Hidden, Toolbar, Tooltip, Typography, useTheme} from '@mui/material';
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
							<Hidden mdUp>
								<Grid item>
									<Link to="/" color="inherit" sx={{textDecoration: 'none'}}>
										<Tooltip title="effOne Hub" placement="right">
											<FontAwesomeIcon icon={faFlagCheckered} size="3x"/>
										</Tooltip>
									</Link>
								</Grid>
							</Hidden>
							<Hidden mdDown>
								<Grid item>
									<Link to="/" color="inherit" sx={{textDecoration: 'none'}}>
										<FontAwesomeIcon icon={faFlagCheckered} size="3x" aria-hidden/>
									</Link>
								</Grid>
								<Grid item>
									<Link to="/" color="inherit" sx={{textDecoration: 'none'}}>
										<Typography variant="h3" component="h1" sx={{fontFamily: 'Racing Sans One'}}>effOne Hub</Typography>
									</Link>
								</Grid>
							</Hidden>
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