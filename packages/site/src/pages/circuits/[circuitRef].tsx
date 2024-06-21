import {CircuitMap, RaceMap, useAppState, useMapCircuitsToMapPoints} from '@/components/app';
import {History, Season} from '@/components/page/circuits';
import {FastestLap, LapLeader, MostWins} from '@/components/page/circuits/stats';
import {OpenAILink, Page} from '@/components/ui';
import {useSlugs} from '@/helpers';
import {useCircuitByRef} from '@/hooks/data';
import {setPageTitle, Tabs, useComponentDimensionsWithRef} from '@gtibrett/mui-additions';
import {Backdrop, Card, CardContent, CardHeader, Divider, Grid, Hidden, Typography} from '@mui/material';

export default function Circuit() {
	const mapCircuitsToMapPoints      = useMapCircuitsToMapPoints();
	const {circuitRef}                = useSlugs<{ circuitRef: string }>();
	const [{currentSeason}]           = useAppState();
	const {data, loading}             = useCircuitByRef(circuitRef, currentSeason);
	const {data: lastSeasonData}      = useCircuitByRef(circuitRef, currentSeason - 1);
	const {ref, dimensions: {height}} = useComponentDimensionsWithRef();
	const seasonToShow                = data?.circuit.season?.[0].results.length ? currentSeason : currentSeason - 1;
	
	setPageTitle(`Circuit: ${data?.circuit.name}`);
	
	if (!circuitRef) {
		throw new Error('Page Not found');
	}
	
	if (!data || loading) {
		return <Backdrop open/>;
	}
	
	const {circuit}         = data;
	const {points, onClick} = mapCircuitsToMapPoints([circuit]);
	
	return (
		<Page
			title={circuit.name}
			subheader={(
				<>
					<Typography variant="body1">{circuit.location}, {circuit.country}</Typography>
					{circuit.circuitDescription?.description && (
						<>
							<Typography variant="body1">{circuit.circuitDescription.description}</Typography>
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
								content: <History data={data} loading={loading}/>
							},
							{
								id:      'map', label: 'Circuit Map',
								content: <CircuitMap circuitRef={circuitRef} height="50vh"/>
							},
							{
								id:      'season', label: `${currentSeason} Season`,
								content: <Season data={data} loading={loading}/>
							}
						]}/>
					</Card>
				</Grid>
				
				<Grid item xs={12} md={4} lg={3} sx={{order: {xs: 1, md: 2}}}>
					<Card sx={{height: '100%'}}>
						<CardHeader title={`${seasonToShow} Season`}/>
						<CardContent>
							<Grid container spacing={2}>
								<LapLeader data={seasonToShow === currentSeason ? data : lastSeasonData} loading={loading}/>
								<MostWins data={seasonToShow === currentSeason ? data : lastSeasonData} loading={loading}/>
								<FastestLap data={seasonToShow === currentSeason ? data : lastSeasonData} loading={loading}/>
							</Grid>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</Page>
	);
}