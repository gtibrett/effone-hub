import type { PropsWithChildren } from 'react';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { Alert, Grid, Link, Skeleton, Typography, type TypographyProps } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import { DriverByLine } from '@/components/app';
import type { DriverPageData } from '@/components/page/driver';
import type { Team } from '@/gql/graphql';
import { toPoints } from '@/helpers';

const CellValueWrapper = ({
	align = 'center',
	children
}: PropsWithChildren<Pick<TypographyProps, 'align'>>) => (
	<Typography align={align} className="mb-0 mt-1">
		{children}
	</Typography>
);

const query = gql`
	query ConstructorSeasonQuery($teamId: String!, $season: Int!) {
		races(condition: { year: $season }, orderBy: ROUND_ASC) {
			rowId
			year
			round
			officialName
			date
			time

			raceResults(condition: { teamId: $teamId }) {
				raceId
				gridPositionNumber
				positionDisplayOrder
				points
				timeMillis
				driverId
				teamId
				reasonRetired
			}
		}
	}
`;

type SeasonProps = { teamId: Team['id']; season: number };

export default function Season({ teamId, season }: SeasonProps) {
	const { data, loading } = useQuery<DriverPageData>(query, { variables: { teamId, season } });

	if (loading || !data) {
		return <Skeleton variant="rectangular" height={400} />;
	}

	const races = data.races;

	if (!races?.length) {
		return (
			<Alert variant="outlined" severity="info">
				Season Data Not Available
			</Alert>
		);
	}

	return (
		<>
			{/* FIXME <SeasonChart data={data} loading={loading} season={season} />*/}
			<DataGrid
				rows={races}
				rowHeight={100}
				autoHeight
				density="compact"
				getRowId={row => row.round || ''}
				initialState={{
					sorting: {
						sortModel: [{ field: 'date', sort: 'asc' }]
					}
				}}
				columns={[
					{
						field: 'date',
						headerName: 'Date',
						headerAlign: 'center',
						type: 'date',
						align: 'center',
						valueGetter: value => new Date(value),
						renderCell: ({ value }) => value.toLocaleDateString()
					},
					{
						field: 'officialName',
						headerName: 'Race',
						flex: 1,
						renderCell: ({ row, value }) => (
							<Link href={`/${season}/${row.round}#${row.officialName}`}>
								{value}
							</Link>
						)
					},
					{
						field: 'driver',
						headerName: 'Drivers',
						flex: 1,
						renderCell: ({ row }) => (
							<>
								{row.raceResults.map(result => (
									<CellValueWrapper
										key={result.driverId ?? undefined}
										align="left"
									>
										<DriverByLine
											id={result.driverId ?? undefined}
											variant="link"
										/>
									</CellValueWrapper>
								))}
							</>
						)
					},
					{
						field: 'qualifying',
						headerName: 'Qualifying',
						headerAlign: 'center',
						align: 'center',
						renderCell: ({ row }) => (
							<>
								{row.raceResults.map(result => (
									<CellValueWrapper key={result.driverId ?? ''}>
										{result.gridPositionNumber}
									</CellValueWrapper>
								))}
							</>
						)
					},
					{
						field: 'finish',
						headerName: 'Finish',
						headerAlign: 'center',
						align: 'center',
						renderCell: ({ row }) => {
							return (
								<>
									{row.raceResults.map(result => (
										<CellValueWrapper key={result.driverId ?? ''}>
											{result.positionDisplayOrder}
										</CellValueWrapper>
									))}
								</>
							);
						}
					},
					{
						field: 'points',
						headerName: 'Points',
						headerAlign: 'center',
						align: 'center',
						renderCell: ({ row }) => {
							return (
								<Grid container spacing={0} className="justify-center">
									{row.raceResults.map(result => (
										<Grid key={result.driverId ?? ''} size={12}>
											<Typography align="center">
												{toPoints(result.points)}
											</Typography>
										</Grid>
									))}
								</Grid>
							);
						}
					}
				]}
			/>
		</>
	);
}
