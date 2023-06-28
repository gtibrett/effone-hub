import {faSquareFull} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Circuit} from '@gtibrett/effone-hub-api';
import {Box, Grid, SxProps, ToggleButton, ToggleButtonGroup, useTheme} from '@mui/material';
import {blue, red, yellow} from '@mui/material/colors';
import {SVGProps, SyntheticEvent, useState} from 'react';
import {useDarkMode} from '../ui-components/Theme';
import {AlbertPark, Americas, Bahrain, Baku, Catalunya, Estoril, Hungaroring, Imola, Interlagos, Jeddah, Losail, MarinaBay, Miami, Monaco, Monza, RedBullRing, Ricard, Rodriguez, Shanghai, Silverstone, Sochi, Spa, Suzuka, Villeneuve, YasMarina, Zandvoort} from './circuits';

type CircuitMapProps = SVGProps<any> & {
	variant?: 'interactive' | 'simple';
	circuit: Circuit;
}

const getMapSVG = (circuit: Circuit, svgProps: SVGProps<any>) => {
	switch (circuit.circuitId) {
		case 'albert_park':
			return <AlbertPark {...svgProps}/>;
		case 'americas':
			return <Americas {...svgProps}/>;
		case 'bahrain':
			return <Bahrain {...svgProps}/>;
		case 'baku':
			return <Baku {...svgProps}/>;
		case 'catalunya':
			return <Catalunya {...svgProps}/>;
		case 'estoril':
			return <Estoril {...svgProps}/>;
		case 'hungaroring':
			return <Hungaroring {...svgProps}/>;
		case 'imola':
			return <Imola {...svgProps}/>;
		case 'interlagos':
			return <Interlagos {...svgProps}/>;
		case 'jeddah':
			return <Jeddah {...svgProps}/>;
		case 'losail':
			return <Losail {...svgProps}/>;
		case 'marina_bay':
			return <MarinaBay {...svgProps}/>;
		case 'miami':
			return <Miami {...svgProps}/>;
		case 'monaco':
			return <Monaco {...svgProps}/>;
		case 'monza':
			return <Monza {...svgProps}/>;
		case 'red_bull_ring':
			return <RedBullRing {...svgProps}/>;
		case 'ricard':
			return <Ricard {...svgProps}/>;
		case 'rodriguez':
			return <Rodriguez {...svgProps}/>;
		case 'shanghai':
			return <Shanghai {...svgProps}/>;
		case 'silverstone':
			return <Silverstone {...svgProps}/>;
		case 'sochi':
			return <Sochi {...svgProps}/>;
		case 'spa':
			return <Spa {...svgProps}/>;
		case 'suzuka':
			return <Suzuka {...svgProps}/>;
		// case 'vegas':
		// 	return <Vegas {...svgProps}/>;
		case 'villeneuve':
			return <Villeneuve {...svgProps}/>;
		case 'yas_marina':
			return <YasMarina {...svgProps}/>;
		case 'zandvoort':
			return <Zandvoort {...svgProps}/>;
		
		default:
			return null;
	}
};

const useSectorColors = () => {
	const darkMode = useDarkMode();
	const shade    = darkMode ? 800 : 500;
	return {
		sector1: red[shade],
		sector2: blue[shade],
		sector3: yellow[shade]
	};
};

const useSx = (variant: CircuitMapProps['variant'], sector: string | undefined): SxProps => {
	const theme                       = useTheme();
	const {sector1, sector2, sector3} = useSectorColors();
	return {
		'& > svg': {
			p:        1.5,
			overflow: 'visible'
		},
		
		'& svg > path': {
			strokeWidth: 8
		},
		
		'& svg > .st0': {
			stroke:      theme.palette.text.primary,
			strokeWidth: 15 / (variant === 'simple' ? 1.75 : 1)
		},
		
		'& svg > .st1': {
			stroke:      sector1,
			strokeWidth: (sector === '1' ? 15 : 7) / (variant === 'simple' ? 1.75 : 1)
		},
		
		'& svg > .st2': {
			stroke:      sector2,
			strokeWidth: (sector === '2' ? 15 : 7) / (variant === 'simple' ? 1.75 : 1)
		},
		
		'& svg > .st3': {
			stroke:      sector3,
			strokeWidth: (sector === '3' ? 15 : 7) / (variant === 'simple' ? 1.75 : 1)
		}
	};
};

export default function CircuitMap({variant = 'interactive', circuit, height = 300, width = 'auto', ...svgProps}: CircuitMapProps) {
	const mapSVG                      = getMapSVG(circuit, {height, width, 'aria-label': `${circuit.circuitName} Map`, ...svgProps});
	const {sector1, sector2, sector3} = useSectorColors();
	const [sector, setSector]         = useState<string | undefined>();
	const sx                          = useSx(variant, sector);
	
	if (!mapSVG) {
		return null;
	}
	
	if (variant === 'simple') {
		return <Box sx={sx}>{mapSVG}</Box>;
	}
	
	const handleChange = (event: SyntheticEvent<HTMLElement>, sector: string) => {
		event.currentTarget.blur();
		setSector(sector);
		return false;
	};
	
	return (
		<Grid container spacing={2} justifyContent="flex-end">
			<Grid item>
				<ToggleButtonGroup size="small" value={sector} onChange={handleChange} exclusive aria-hidden>
					<ToggleButton value="1"><FontAwesomeIcon icon={faSquareFull} color={sector1}/>&nbsp;Sector 1</ToggleButton>
					<ToggleButton value="2"><FontAwesomeIcon icon={faSquareFull} color={sector2}/>&nbsp;Sector 2</ToggleButton>
					<ToggleButton value="3"><FontAwesomeIcon icon={faSquareFull} color={sector3}/>&nbsp;Sector 3</ToggleButton>
				</ToggleButtonGroup>
			</Grid>
			<Grid item xs={12} sx={sx}>{mapSVG}</Grid>
		</Grid>
	);
};