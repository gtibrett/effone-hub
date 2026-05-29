'use client';

import { Suspense } from 'react';
import { useComponentDimensionsWithRef } from '@gtibrett/mui-additions';
import { Card, CardContent, CardHeader, Divider, Grid, Stack, Typography } from '@mui/material';

import { CircuitMap, RaceMap, useAppState, useMapCircuitsToMapPoints } from '@/components/app';
import { History, Season } from '@/components/page/circuits';
import { FastestLap, LapLeader, MostWins } from '@/components/page/circuits/stats';
import { OpenAILink, Page, Tabs } from '@/components/ui';
import { useCircuitByRef } from '@/hooks/data';

export default function CircuitContent({ circuitRef }: { circuitRef: string }) {
	const mapCircuitsToMapPoints = useMapCircuitsToMapPoints();
	const [{ currentSeason }] = useAppState();
	const { data } = useCircuitByRef(circuitRef, currentSeason);
	const { data: lastSeasonData } = useCircuitByRef(circuitRef, currentSeason - 1);
	const {
		ref,
		dimensions: { height }
	} = useComponentDimensionsWithRef();
	const seasonToShow = data?.circuit.season?.[0]?.raceResults?.length
		? currentSeason
		: currentSeason - 1;

	if (!circuitRef) {
		throw new Error('Page Not found');
	}

	if (!data) {
		return null;
	}

	const { circuit } = data;
	const { points, onClick } = mapCircuitsToMapPoints([circuit]);

	return (
		<Suspense>
			<Page
				title={circuit.fullName}
				subheader={
					<>
						<Typography variant="body1">
							{circuit.placeName}, {circuit.countryId}
						</Typography>
						{circuit.description?.description && (
							<>
								<Typography variant="body1">
									{circuit.description.description}
								</Typography>
								<Divider orientation="horizontal" className="my-2" />
								<OpenAILink />
							</>
						)}
					</>
				}
				action={
					<Card className="hidden md:block h-full" ref={ref}>
						<RaceMap
							points={points}
							onClick={onClick}
							height={height}
							centerOn={circuit}
							zoom
						/>
					</Card>
				}
				actionProps={{ size: { xs: 0, md: 4, lg: 3 } }}
			>
				<Grid container spacing={2}>
					<Grid
						className="order-2 md:order-1"
						size={{
							xs: 12,
							md: 8,
							lg: 9
						}}
					>
						<Card>
							<Tabs
								active="history"
								tabs={[
									{
										id: 'history',
										label: 'History',
										content: <History data={data} loading={false} />
									},
									{
										id: 'map',
										label: 'Circuit Map',
										content: (
											<CircuitMap circuitRef={circuitRef} height="50vh" />
										)
									},
									{
										id: 'season',
										label: `${currentSeason} Season`,
										content: <Season data={data} loading={false} />
									}
								]}
							/>
						</Card>
					</Grid>

					<Grid
						className="order-1 md:order-2"
						size={{
							xs: 12,
							md: 4,
							lg: 3
						}}
					>
						<Card className="h-full">
							<CardHeader title={`${seasonToShow} Season`} />
							<CardContent>
								<Stack spacing={2}>
									<LapLeader
										data={
											seasonToShow === currentSeason ? data : lastSeasonData
										}
										loading={false}
									/>
									<MostWins
										data={
											seasonToShow === currentSeason ? data : lastSeasonData
										}
										loading={false}
									/>
									<FastestLap
										data={
											seasonToShow === currentSeason ? data : lastSeasonData
										}
										loading={false}
									/>
								</Stack>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</Page>
		</Suspense>
	);
}
