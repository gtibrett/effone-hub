'use client';

import {CircuitMap, RaceMap, useAppState, useMapCircuitsToMapPoints} from '@/components/app';
import {History, Season} from '@/components/page/circuits';
import {FastestLap, LapLeader, MostWins} from '@/components/page/circuits/stats';
import {OpenAILink, Page} from '@/components/ui';
import {useCircuitByRef} from '@/hooks/data';
import {Tabs} from '@gtibrett/mui-additions';
import useComponentDimensionsWithRef from '@/hooks/useComponentDimensionsWithRef';
import {Card, CardContent, CardHeader, Divider, Grid, Hidden, Typography} from '@mui/material';
import {Suspense} from 'react';

export default function CircuitContent({circuitRef}: {circuitRef: string}) {
	const mapCircuitsToMapPoints      = useMapCircuitsToMapPoints();
	const [{currentSeason}]           = useAppState();
	const {data}                      = useCircuitByRef(circuitRef, currentSeason);
	const {data: lastSeasonData}      = useCircuitByRef(circuitRef, currentSeason - 1);
	const {ref, dimensions: {height}} = useComponentDimensionsWithRef();
	const seasonToShow                = data?.circuit.season?.nodes?.[0]?.raceResults?.nodes?.length ? currentSeason : currentSeason - 1;

	if (!circuitRef) {
		throw new Error('Page Not found');
	}

	if (!data) {
		return null;
	}

	const {circuit}         = data;
	const {points, onClick} = mapCircuitsToMapPoints([circuit]);

	return (
		<Suspense>
			<Page
				title={circuit.fullName}
				subheader={(
					<>
						<Typography variant="body1">{circuit.placeName}, {circuit.countryId}</Typography>
						{circuit.description?.description && (
							<>
								<Typography variant="body1">{circuit.description.description}</Typography>
								<Divider orientation="horizontal" sx={{my: 1}}/>
								<OpenAILink/>
							</>
						)}
					</>
				)}
				action={(
					<Hidden mdDown>
						<Card sx={{height: '100%'}} ref={ref}>
							<RaceMap points={points} onClick={onClick} height={height} centerOn={circuit} zoom/>
						</Card>
					</Hidden>
				)}
				actionProps={{xs: 0, md: 4, lg: 3}}
			>
				<Grid container spacing={2}>
					<Grid item xs={12} md={8} lg={9} sx={{order: {xs: 2, md: 1}}}>
						<Card>
							<Tabs active="history" tabs={[
								{
									id:      'history', label: 'History',
									content: <History data={data} loading={false}/>
								},
								{
									id:      'map', label: 'Circuit Map',
									content: <CircuitMap circuitRef={circuitRef} height="50vh"/>
								},
								{
									id:      'season', label: `${currentSeason} Season`,
									content: <Season data={data} loading={false}/>
								}
							]}/>
						</Card>
					</Grid>

					<Grid item xs={12} md={4} lg={3} sx={{order: {xs: 1, md: 2}}}>
						<Card sx={{height: '100%'}}>
							<CardHeader title={`${seasonToShow} Season`}/>
							<CardContent>
								<Grid container spacing={2}>
									<LapLeader data={seasonToShow === currentSeason ? data : lastSeasonData} loading={false}/>
									<MostWins data={seasonToShow === currentSeason ? data : lastSeasonData} loading={false}/>
									<FastestLap data={seasonToShow === currentSeason ? data : lastSeasonData} loading={false}/>
								</Grid>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</Page>
		</Suspense>
	);
}
