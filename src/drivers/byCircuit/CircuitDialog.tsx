import {Box, Dialog, DialogContent, DialogTitle, Grid, Typography, useTheme} from '@mui/material';
import CircuitMap from '../../circuits/CircuitMap';
import {Driver} from '../../types/ergast';
import CircuitChart from './CircuitChart';
import {CircuitWithRaces} from './Circuits';
import CircuitTable from './CircuitTable';

type CircuitProps = {
	driver: Driver;
	circuit: CircuitWithRaces | undefined;
	onClose: () => void
};
export default function CircuitDialog({driver, circuit, onClose}: CircuitProps) {
	const theme = useTheme();
	if (!circuit) {
		return null;
	}
	
	return <Dialog open={true} onClose={onClose} maxWidth="lg" fullWidth>
		<DialogTitle>
			{circuit.circuitName}
			<Typography paragraph variant="subtitle1">{driver.givenName} {driver.familyName}</Typography>
		</DialogTitle>
		<DialogContent dividers sx={{height: '90vh'}}>
			<Grid container spacing={2}>
				<Grid item xs={9}>
					<CircuitChart races={circuit.races}/>
				</Grid>
				<Grid item xs={3}>
					<Box sx={{border: `1px solid ${theme.palette.divider}`, borderRadius: theme.shape.borderRadius / 2, overflow: 'hidden'}}>
						<CircuitMap circuits={[circuit]} height={200} centerOn={circuit.Location} zoom/>
					</Box>
				</Grid>
				<Grid item xs={12}>
					<CircuitTable races={circuit.races}/>
				</Grid>
			</Grid>
		</DialogContent>
	</Dialog>;
	
}