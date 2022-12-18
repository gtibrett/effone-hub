import {Card, CardHeader, Grid, ThemeProvider} from '@mui/material';
import Schedule from '../schedule/Schedule';
import Constructors from '../standings/Constructors';
import Drivers from '../standings/Drivers';
import Header from '../ui-components/Header';
import {useTheme} from '../ui-components/Theme';
import AppStateProvider from './AppStateProvider';

function Index() {
	const theme = useTheme();
	
	
	return (
		<AppStateProvider>
			<ThemeProvider theme={theme}>
				<Header/>
				
				<main>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<Card variant="outlined">
								<CardHeader title="Schedule"/>
								<Schedule/>
							</Card>
						</Grid>
						<Grid item xs={3}>
							<Card variant="outlined">
								<CardHeader title="Constructor's Standings"/>
								<Constructors/>
							</Card>
						</Grid>
						<Grid item xs={3}>
							<Card variant="outlined">
								<CardHeader title="Driver's Standings"/>
								<Drivers/>
							</Card>
						</Grid>
					</Grid>
				</main>
				<footer>
				
				</footer>
			</ThemeProvider>
		</AppStateProvider>
	);
}

export default Index;
