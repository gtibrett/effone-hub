import {useDarkMode} from '@/components/ui';
import {Circuit} from '@/gql/graphql';
import {useCircuitByRef} from '@/hooks/data';
import {cssVar} from '@/lib/tokens';
import {faSquareFull} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Box, Grid, SxProps, ToggleButton, ToggleButtonGroup} from '@mui/material';
import {blue, red, yellow} from '@mui/material/colors';
import {Suspense, SVGProps, SyntheticEvent, useState} from 'react';
import getMapSVG from './circuits/getMapSVG';

type CircuitMapProps = SVGProps<any> & {
	variant?: 'interactive' | 'simple';
	circuitRef: Circuit['rowId'];
}

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
	const {sector1, sector2, sector3} = useSectorColors();
	// var(--color-text-primary) flips with OS scheme at paint.
	const textPrimary                 = cssVar.text.primary;
	return {
		'& > svg': {
			p:        1.5,
			overflow: 'visible'
		},

		'& svg > path': {
			strokeWidth: 8
		},

		'& svg  .st0': {
			stroke:      textPrimary,
			strokeWidth: 15 / (variant === 'simple' ? 1.75 : 1)
		},
		
		'& svg  .st1': {
			stroke:      sector1,
			strokeWidth: (sector === '1' ? 15 : 7) / (variant === 'simple' ? 1.75 : 1)
		},
		
		'& svg  .st2': {
			stroke:      sector2,
			strokeWidth: (sector === '2' ? 15 : 7) / (variant === 'simple' ? 1.75 : 1)
		},
		
		'& svg  .st3': {
			stroke:      sector3,
			strokeWidth: (sector === '3' ? 15 : 7) / (variant === 'simple' ? 1.75 : 1)
		}
	};
};

export default function CircuitMap({variant = 'interactive', circuitRef, height, width, ...svgProps}: CircuitMapProps) {
	const {sector1, sector2, sector3} = useSectorColors();
	const [sector, setSector]         = useState<string | undefined>();
	const sx                          = useSx(variant, sector);
	const {data: {circuit}}           = useCircuitByRef(circuitRef);
	
	
	const mapSVG = getMapSVG(circuitRef, {height, width, 'aria-label': `${circuit.fullName} Map`, ...svgProps});
	
	if (!mapSVG) {
		return null;
	}
	
	if (variant === 'simple') {
		return <Suspense><Box sx={sx}>{mapSVG}</Box></Suspense>;
	}
	
	const handleChange = (event: SyntheticEvent<HTMLElement>, sector: string) => {
		event.currentTarget.blur();
		setSector(sector);
		return false;
	};
	
	return (
        <Suspense>
            <Grid container spacing={2} sx={{
                justifyContent: "flex-end"
            }}>
				<Grid>
					<ToggleButtonGroup size="small" value={sector} onChange={handleChange} exclusive aria-hidden>
						<ToggleButton value="1"><FontAwesomeIcon icon={faSquareFull} color={sector1}/>&nbsp;Sector 1</ToggleButton>
						<ToggleButton value="2"><FontAwesomeIcon icon={faSquareFull} color={sector2}/>&nbsp;Sector 2</ToggleButton>
						<ToggleButton value="3"><FontAwesomeIcon icon={faSquareFull} color={sector3}/>&nbsp;Sector 3</ToggleButton>
					</ToggleButtonGroup>
				</Grid>
				<Grid sx={sx} size={12}>{mapSVG}</Grid>
			</Grid>
        </Suspense>
    );
};