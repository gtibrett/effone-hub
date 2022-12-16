import {AppBar, Card, CardContent, CardHeader, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Toolbar, Typography} from '@mui/material';
import {useState} from 'react';
import Drivers from './standings/Drivers';

function App() {
	const [season, setSeason] = useState<string>('current');
	
	return (
		<>
			<header>
				<nav>
					<AppBar color="primary">
						<Toolbar>
							<Typography>
								<InputLabel>Age
									<Select
										variant="outlined"
										value={season}
										label="Age"
										onChange={(event: SelectChangeEvent) => {
											setSeason(event.target.value as string);
										}}
									>
										<MenuItem value="current">Current</MenuItem>
										<MenuItem value="2021">2021</MenuItem>
									</Select>
								</InputLabel>
							</Typography>
						</Toolbar>
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
								<Drivers season={season}/>
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
