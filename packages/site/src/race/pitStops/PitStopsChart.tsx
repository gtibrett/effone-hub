import {NivoTooltipFactory, useGetAccessibleColor, useNivoTheme} from '@effonehub/ui-components';
import {Box, Skeleton, useMediaQuery, useTheme} from '@mui/material';
import {BarSvgProps, ResponsiveBar} from '@nivo/bar';
import {PitStopTableRow} from './PitStops';
import PitStopTooltip from './PitStopTooltip';

type PitStopsChartProps = {
	pitStops: PitStopTableRow[] | undefined;
	maxStops: number;
}

export type PitStopSerie = {
	driverId: number;
	code: string;
	[stop: string]: number | string;
}

export default function PitStopsChart({maxStops, pitStops}: PitStopsChartProps) {
	const nivoTheme          = useNivoTheme();
	const theme              = useTheme();
	const isSmall            = useMediaQuery(theme.breakpoints.down('sm'));
	const getAccessibleColor = useGetAccessibleColor();
	
	if (!pitStops) {
		return <Skeleton variant="rectangular" height={isSmall ? 400 : 150}/>;
	}
	
	if (!pitStops.length) {
		return null;
	}
	
	const keys: string[]       = (new Array(maxStops).fill(null).map((v, i) => String(i + 1)));
	const data: PitStopSerie[] = pitStops.map(p => {
		const stop: PitStopSerie = {
			driverId: p.driverId,
			code:     p.code || '',
			color:    getAccessibleColor(p.color || theme.palette.primary.main)
		};
		
		p.stops.forEach((s) => {
			if (s.milliseconds) {
				stop[String(s.stop)]              = s.milliseconds;
				stop[`${String(s.stop)}-display`] = s.duration || '';
			}
		});
		
		return stop;
	});
	
	const layoutProps: Partial<BarSvgProps<any>> = {};
	if (isSmall) {
		layoutProps.layout     = 'horizontal';
		layoutProps.margin     = {left: 44};
		layoutProps.axisBottom = null;
		layoutProps.axisLeft   = {
			tickSize:     0,
			tickPadding:  5,
			tickRotation: 0
		};
	} else {
		layoutProps.layout     = 'vertical';
		layoutProps.axisBottom = {
			tickSize:     0,
			tickPadding:  5,
			tickRotation: 0
		};
		layoutProps.axisLeft   = null;
	}
	
	return (
		<Box sx={{height: isSmall ? 400 : 150, mb: 2}} aria-hidden>
			<ResponsiveBar
				theme={nivoTheme}
				indexBy="code"
				keys={keys}
				data={data}
				colors={({data}) => data.color}
				enableLabel={false}
				enableGridY={false}
				padding={.1}
				innerPadding={1.5}
				tooltip={NivoTooltipFactory(PitStopTooltip)}
				{...layoutProps}
				margin={{top: 16, right: 16, bottom: 32, left: 16,...layoutProps.margin}}
			/>
		</Box>
	);
}