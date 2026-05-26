import { Dispatch, SetStateAction } from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, useComponentDimensionsWithRef } from '@gtibrett/mui-additions';
import { Card, Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import { DriverByLine } from '@/components/app';
import { Place } from '@/components/page/race';

import useDriverStandingsData from './useDriversStandingsData';

const sx = {
	'& > .MuiDataGrid-main': {
		overflowX: 'hidden'
	},
	'& > div > .MuiDataGrid-footerContainer': {
		display: 'none'
	}
};

type DriverStandingsDialogProps = {
	season: number;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function DriverStandingsDialog({
	season,
	open,
	setOpen
}: DriverStandingsDialogProps) {
	const { ref, dimensions } = useComponentDimensionsWithRef();
	const { data } = useDriverStandingsData(season);
	const races = data?.season?.racesByYear?.nodes?.filter(r => r.raceDriverStandings.nodes.length);
	const standings = races?.at(-1)?.raceDriverStandings?.nodes;
	const onClose = () => setOpen(false);

	if (!standings?.length) {
		return null;
	}

	const [p1, p2, p3, ...rest] = standings;

	return (
		<Dialog
			open={open}
			onClose={onClose}
			maxWidth="lg"
			fullWidth
			title={`${season} Driver Standings`}
			closeIcon={<FontAwesomeIcon fixedWidth icon={faTimes} />}
		>
			<Grid container spacing={2}>
				<Grid
					size={{
						xs: 12,
						lg: 5
					}}
				>
					<Grid container spacing={2} ref={ref}>
						<Grid size={12}>
							<Place
								driverId={p1.driver?.rowId}
								place={1}
								points={p1.points || undefined}
								asterisk={season === 2021}
							/>
						</Grid>
						<Grid size={12}>
							<Place
								driverId={p2.driver?.rowId}
								place={2}
								points={p2.points || undefined}
							/>
						</Grid>
						<Grid size={12}>
							<Place
								driverId={p3.driver?.rowId}
								place={3}
								points={p3.points || undefined}
							/>
						</Grid>
					</Grid>
				</Grid>
				<Grid
					size={{
						xs: 12,
						lg: 7
					}}
				>
					<Card style={{ height: dimensions.height - 14 }}>
						<DataGrid
							sx={sx}
							rows={rest}
							density="compact"
							getRowId={r => r.driver?.rowId || r.driverId || ''}
							hideFooter
							initialState={{
								sorting: {
									sortModel: [{ field: 'position', sort: 'asc' }]
								}
							}}
							columns={[
								{
									field: 'position',
									headerName: 'P',
									headerAlign: 'center',
									type: 'number',
									align: 'center',
									width: 16
								},
								{
									field: 'code',
									headerName: 'Driver',
									flex: 1,
									renderCell: ({ row }) => (
										<DriverByLine
											id={row.driver?.rowId}
											avatarProps={{ size: 24 }}
											flagProps={{ size: 16 }}
										/>
									),
									minWidth: 200
								},
								{
									field: 'points',
									headerName: 'Points',
									type: 'number'
								}
							]}
						/>
					</Card>
				</Grid>
			</Grid>
		</Dialog>
	);
}
