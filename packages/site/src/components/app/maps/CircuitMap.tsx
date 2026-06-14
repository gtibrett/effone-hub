import { Suspense, type SVGProps } from 'react';
import { faSquareFull } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Grid, ToggleButton, ToggleButtonGroup } from '@mui/material';

import type { Circuit } from '@/gql/graphql';

import getMapSVG from './circuits/getMapSVG';

import styles from './CircuitMap.module.css';

type CircuitMapProps = SVGProps<SVGSVGElement> & {
	variant?: 'interactive' | 'simple';
	circuitRef: Circuit['id'];
	// Server-supplied circuit name for the SVG aria-label (the track SVG itself
	// is resolved from circuitRef, so no data fetch is needed here).
	circuitName?: string | null;
};

export default function CircuitMap({
	variant = 'interactive',
	circuitRef,
	circuitName,
	height,
	width,
	...svgProps
}: CircuitMapProps) {
	const mapSVG = getMapSVG(circuitRef, {
		height,
		width,
		'aria-label': `${circuitName ?? circuitRef} Map`,
		...svgProps
	});

	if (!mapSVG) {
		return null;
	}

	if (variant === 'simple') {
		return (
			<Suspense>
				<Box className={styles.map}>{mapSVG}</Box>
			</Suspense>
		);
	}

	return (
		<Suspense>
			<Grid container spacing={2} className="justify-end">
				<Grid>
					<ToggleButtonGroup size="small" exclusive aria-hidden disabled>
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
				<Grid className={styles.map} size={12}>
					{mapSVG}
				</Grid>
			</Grid>
		</Suspense>
	);
}
