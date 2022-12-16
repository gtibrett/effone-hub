import {AppBar, Card, CardContent, CardHeader, Grid, Toolbar} from '@mui/material';
import {mapDriversStandings} from './API';
import DataTable from './components/DataTable';
import Drivers from './standings/Drivers';

function App() {
	
	
	return (
		<>
			<header>
				<nav>
					<AppBar>
						<Toolbar/>
					</AppBar>
				</nav>
				<Toolbar/>
			</header>
			<main>
				<Grid container spacing={2}>
					<Grid item xs={4}>
						<Card variant="outlined">
							<CardHeader title="Next Race"/>
							<CardContent></CardContent>
						</Card>
					</Grid>
					<Grid item xs={4}>
						<Card variant="outlined">
							<CardHeader title="Next Race"/>
							<CardContent></CardContent>
						</Card>
					</Grid>
					<Grid item xs={4}>
						<Card variant="outlined">
							<CardHeader title="Driver's Standings"/>
							<CardContent>
								<Drivers/>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</main>
			<footer>
			
			</footer>
		</>
	);
}

export default App;
