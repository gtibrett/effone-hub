import {DriverByLine, RaceMap, useMapCircuitsToMapPoints} from '@/components/app';
import {DriverId} from '@/types';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Dialog, Tabs, Card, Typography} from '@/components/ui';
 
import CircuitChart from './CircuitChart';
import CircuitPerformance from './CircuitPerformance';
import CircuitTable from './CircuitTable';
import LapTimesByYearBox from './LapTimesByYearBox';
import useCircuitDialogData from './useCircuitDialogData';

type CircuitProps = {
	driverId: DriverId;
	circuitId?: string;
	onClose: () => void
};

export default function CircuitDialog({driverId, circuitId, onClose}: CircuitProps) {
	const mapCircuitsToMapPoints = useMapCircuitsToMapPoints();
	const {data, loading}        = useCircuitDialogData(circuitId, driverId);

	if (!data || loading) {
		return null;
	}

	const {circuit}         = data;
	const {points, onClick} = mapCircuitsToMapPoints([circuit]);

	return (
		<Dialog
			open={!!circuitId} closeIcon={<FontAwesomeIcon fixedWidth icon={faTimes}/>} onClose={onClose} maxWidth="lg" fullWidth
			title={
				<>
					{circuit.fullName}
					<Typography paragraph variant="subtitle1"><DriverByLine id={driverId} variant="name"/></Typography>
				</>
			}>
			<div className="grid grid-cols-12 gap-4">
				<div className="col-span-9">
					<Tabs active="results" tabs={[
						{
							id:      'results',
							label:   'Results',
							content: (
								         <>
									         <CircuitChart data={data} loading={loading}/>
									         <CircuitTable data={data} loading={loading}/>
								         </>
							         )
						},
						{
							id:      'laptimes',
							label:   'Lap Times',
							content: <LapTimesByYearBox data={data} loading={loading}/>
						}
					]}/>
				</div>
				<div className="col-span-3">
					<div className="grid grid-cols-12 gap-2">
						<div className="col-span-12">
							<Card className="mb-4">
								<RaceMap points={points} onClick={onClick} height={200} centerOn={{latitude: circuit.latitude, longitude: circuit.longitude}} zoom/>
							</Card>
						</div>
						<div className="col-span-12"><CircuitPerformance data={data} loading={loading}/></div>
					</div>
				</div>
			</div>
		</Dialog>
	);
}
