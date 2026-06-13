'use client';

import { useState } from 'react';
import { Alert, Grid, Link, Skeleton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import type { DriverCareerData } from '@/app/lib/cached-data';
import { ConstructorByLine } from '@/components/app';
import { toPoints } from '@/helpers';

import SeasonDialog from '../season/SeasonDialog';
import Stats from '../stats';
import CareerChart from './CareerChart';
import { getSeasonEndTeamByYear } from './seasonEndTeam';

type CareerProps = {
	driverId: string;
	careerData: DriverCareerData['driver'] | null;
	statsData: import('../stats/useDriverStatsData').DriverStatsData['driver'] | null;
};

export default function Career({ driverId, careerData, statsData }: CareerProps) {
	const careerStandings = careerData?.standings;
	const racesByYear: { [key: number]: number } = {};
	const [active, setActive] = useState<number | undefined>();

	if (!careerStandings) {
		return <Skeleton variant="rectangular" height={400} />;
	}

	if (!careerStandings.length) {
		return (
			<Alert variant="outlined" severity="info">
				Career Data Not Available
			</Alert>
		);
	}

	careerData?.raceResults?.forEach(r => {
		const year = r.race?.year;
		if (year) {
			racesByYear[year] = (racesByYear[year] || 0) + 1;
		}
	});

	const teamByYear = getSeasonEndTeamByYear(careerData?.raceResults);
	const standingsRows = careerStandings
		.map(s => ({
			...s,
			team: s.year != null ? (teamByYear.get(s.year) ?? null) : null,
			races: s.year != null ? (racesByYear[s.year] ?? 0) : 0
		}))
		// hide seasons with no race starts (e.g. practice-only entries)
		.filter(row => row.races > 0);

	return (
		<Grid container spacing={2} className="items-center justify-around">
			<Stats driverId={driverId} statsData={statsData} />
			<Grid size={12} />
			<Grid size={12}>
				<CareerChart driverId={driverId} careerData={careerData} size={200} />
			</Grid>
			<Grid size={12}>
				<SeasonDialog
					season={active}
					driverId={driverId}
					onClose={() => setActive(undefined)}
				/>
				<DataGrid
					rows={standingsRows}
					autoHeight
					density="compact"
					getRowId={r => r.year || ''}
					initialState={{
						sorting: {
							sortModel: [{ field: 'year', sort: 'desc' }]
						}
					}}
					columns={[
						{
							field: 'year',
							headerName: 'Season',
							headerAlign: 'center',
							align: 'center',
							width: 100,
							renderCell: ({ row }) => (
								<Link
									href="#"
									color="secondary"
									onClick={() => setActive(row.year)}
								>
									{row.year}
								</Link>
							)
						},
						{
							field: 'races',
							headerName: 'Races',
							type: 'number',
							headerAlign: 'center',
							align: 'center',
							flex: 1,
							minWidth: 100
						},
						{
							field: 'positionNumber',
							headerName: 'Position',
							type: 'number',
							headerAlign: 'center',
							align: 'center',
							flex: 1,
							minWidth: 100
						},
						{
							field: 'points',
							headerName: 'Points',
							type: 'number',
							headerAlign: 'center',
							align: 'center',
							flex: 1,
							minWidth: 100,
							valueGetter: value => toPoints(value)
						},
						{
							field: 'team',
							headerName: 'Constructor',
							filterable: false,
							renderCell: ({ row }) => (
								<ConstructorByLine id={row.team?.id} variant="link" />
							),
							flex: 1,
							minWidth: 150
						}
					]}
				/>
			</Grid>
		</Grid>
	);
}
