import {QueryResult} from '@apollo/client/react/types/types';
import {Driver} from '@gtibrett/effone-hub-graph-api';
import {Box, Skeleton, useTheme} from '@mui/material';
import {ResponsiveBump} from '@nivo/bump';
import {useMemo} from 'react';
import {NivoTooltip, useNivoTheme} from '../../ui-components';
import useGetAccessibleColor from '../../ui-components/useGetAccessibleColor';
import {HomePageData} from '../types';
import StandingsTooltip from './StandingsTooltip';

type ChartSerie = {
	id: number;
	driver: Driver;
	color: string;
	data: {
		x: number;
		y: number | null;
		total: number | null;
		data?: HomePageData['races'][number]['driverStandings'][number];
	}[]
}
const useChartData = (races: HomePageData['races'] | undefined) => {
	const getAccessibleColor = useGetAccessibleColor();
	const fallbackColor      = useTheme().palette.primary.main; // in case of rookie drivers prior to first round
	
	return useMemo(() => {
		const chartSeries: ChartSerie[] = [];
		
		if (races?.length) {
			races.forEach((race => {
				race.driverStandings?.forEach(standing => {
					let index = chartSeries.findIndex(s => s.id === standing.driverId);
					
					if (index === -1) {
						chartSeries.push({
							id:     standing.driverId,
							driver: standing.driver,
							color:  getAccessibleColor(standing.driver.currentTeam?.team?.colors.primary || fallbackColor),
							data:   (new Array(race.round)).fill(0).map((d, i) => ({x: i + 1, y: null, total: null}))
						});
						
						index = chartSeries.length - 1;
					}
					
					if (standing.position) {
						const roundIndex = chartSeries[index].data.findIndex(d => d.x === race.round);
						
						if (roundIndex === -1) {
							chartSeries[index].data.push({
								x:     race.round,
								y:     standing.position,
								total: standing.points,
								data:  standing
							});
						} else {
							chartSeries[index].data[roundIndex] = {
								...(chartSeries[index].data[roundIndex]),
								y:     standing.position,
								total: standing.points,
								data:  standing
							};
						}
					}
				});
			}));
		}
		
		return chartSeries;
		
	}, [fallbackColor, races, getAccessibleColor]);
};

type DriversChartProps = Pick<QueryResult<HomePageData>, 'data' | 'loading'> & { season: number }

export default function DriversChart({data, loading}: DriversChartProps) {
	const nivoTheme = useNivoTheme();
	const height    = 250;
	const chartData = useChartData(data?.races);
	
	if (loading) {
		return <Skeleton variant="rectangular" height={height}/>;
	}
	
	if (!chartData.length) {
		return null;
	}
	
	return (
		<Box height={height} width="100%" sx={{boxSizing: 'border-box'}} aria-hidden>
			<ResponsiveBump
				theme={nivoTheme}
				data={chartData.map(s => ({...s, id: String(s.id)}))}
				colors={({color}) => color || 'transparent'}
				lineWidth={4}
				activeLineWidth={6}
				inactiveLineWidth={3}
				inactiveOpacity={0.35}
				pointSize={0}
				activePointSize={0}
				inactivePointSize={0}
				pointBorderWidth={0}
				activePointBorderWidth={0}
				startLabel={false}
				endLabel={({driver}) => driver.code || ''}
				enableGridX={false}
				enableGridY={false}
				axisTop={null}
				axisLeft={{
					tickSize:     0,
					tickPadding:  10,
					tickRotation: 0
				}}
				axisBottom={null}
				axisRight={null}
				margin={{top: 0, right: 60, bottom: 24, left: 44}}
				tooltip={NivoTooltip(StandingsTooltip)}
			/>
		</Box>
	);
}