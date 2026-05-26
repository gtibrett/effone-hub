import { CSSProperties, Suspense, SVGProps, SyntheticEvent, useState } from 'react';
import { faSquareFull } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Grid, ToggleButton, ToggleButtonGroup } from '@mui/material';

import { Circuit } from '@/gql/graphql';
import { useCircuitByRef } from '@/hooks/data';

import getMapSVG from './circuits/getMapSVG';

import styles from './CircuitMap.module.css';

type CircuitMapProps = SVGProps<any> & {
	variant?: 'interactive' | 'simple';
	circuitRef: Circuit['rowId'];
};

const buildStrokeVars = (
	variant: CircuitMapProps['variant'],
	sector: string | undefined
): CSSProperties => {
	const divisor = variant === 'simple' ? 1.75 : 1;
	return {
		['--cm-st0-sw' as any]: `${15 / divisor}`,
		['--cm-st1-sw' as any]: `${(sector === '1' ? 15 : 7) / divisor}`,
		['--cm-st2-sw' as any]: `${(sector === '2' ? 15 : 7) / divisor}`,
		['--cm-st3-sw' as any]: `${(sector === '3' ? 15 : 7) / divisor}`
	};
};

export default function CircuitMap({
	variant = 'interactive',
	circuitRef,
	height,
	width,
	...svgProps
}: CircuitMapProps) {
	const [sector, setSector] = useState<string | undefined>();
	const strokeVars = buildStrokeVars(variant, sector);
	const {
		data: { circuit }
	} = useCircuitByRef(circuitRef);

	const mapSVG = getMapSVG(circuitRef, {
		height,
		width,
		'aria-label': `${circuit.fullName} Map`,
		...svgProps
	});

	if (!mapSVG) {
		return null;
	}

	if (variant === 'simple') {
		return (
			<Suspense>
				<Box className={styles.map} style={strokeVars}>
					{mapSVG}
				</Box>
			</Suspense>
		);
	}

	const handleChange = (event: SyntheticEvent<HTMLElement>, sector: string) => {
		event.currentTarget.blur();
		setSector(sector);
		return false;
	};

	return (
		<Suspense>
			<Grid container spacing={2} className="justify-end">
				<Grid>
					<ToggleButtonGroup
						size="small"
						value={sector}
						onChange={handleChange}
						exclusive
						aria-hidden
					>
						<ToggleButton value="1">
							<FontAwesomeIcon
								icon={faSquareFull}
								style={{ color: 'var(--map-sector-1)' }}
							/>
							&nbsp;Sector 1
						</ToggleButton>
						<ToggleButton value="2">
							<FontAwesomeIcon
								icon={faSquareFull}
								style={{ color: 'var(--map-sector-2)' }}
							/>
							&nbsp;Sector 2
						</ToggleButton>
						<ToggleButton value="3">
							<FontAwesomeIcon
								icon={faSquareFull}
								style={{ color: 'var(--map-sector-3)' }}
							/>
							&nbsp;Sector 3
						</ToggleButton>
					</ToggleButtonGroup>
				</Grid>
				<Grid className={styles.map} style={strokeVars} size={12}>
					{mapSVG}
				</Grid>
			</Grid>
		</Suspense>
	);
}
