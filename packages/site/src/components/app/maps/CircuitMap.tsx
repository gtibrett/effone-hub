import {useDarkMode} from '@/components/ui';
import {ToggleGroup, ToggleGroupItem} from '@/components/ui/shadcn/toggle-group';
import {Circuit} from '@/gql/graphql';
import {useCircuitByRef} from '@/hooks/data';
import {faSquareFull} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Grid} from '@/components/ui';
import {useCssTokens} from '@/lib/cssTokens';
import {blue, red, yellow} from '@/lib/muiColors';
import {CSSProperties, Suspense, SVGProps, useId, useState} from 'react';
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

type MapStyleProps = {
	variant: CircuitMapProps['variant'];
	sector:  string | undefined;
};

/**
 * Renders the per-instance scoped CSS that used to live in the MUI `sx` prop.
 * We can't push these into Tailwind directly because the rules target SVG
 * class hooks emitted by the static asset (`.st0`, `.st1`, ...) and several
 * stroke widths depend on the active sector / variant.
 */
function CircuitMapStyles({className, variant, sector}: MapStyleProps & {className: string}) {
	const tokens                       = useCssTokens();
	const {sector1, sector2, sector3}  = useSectorColors();
	const simpleScale                  = variant === 'simple' ? 1.75 : 1;
	const st0Width                     = 15 / simpleScale;
	const st1Width                     = (sector === '1' ? 15 : 7) / simpleScale;
	const st2Width                     = (sector === '2' ? 15 : 7) / simpleScale;
	const st3Width                     = (sector === '3' ? 15 : 7) / simpleScale;

	return (
		<style>{`
			.${className} > svg { padding: 12px; overflow: visible; }
			.${className} svg > path { stroke-width: 8; }
			.${className} svg .st0 { stroke: ${tokens.foreground}; stroke-width: ${st0Width}; }
			.${className} svg .st1 { stroke: ${sector1}; stroke-width: ${st1Width}; }
			.${className} svg .st2 { stroke: ${sector2}; stroke-width: ${st2Width}; }
			.${className} svg .st3 { stroke: ${sector3}; stroke-width: ${st3Width}; }
		`}</style>
	);
}

export default function CircuitMap({variant = 'interactive', circuitRef, height, width, ...svgProps}: CircuitMapProps) {
	const {sector1, sector2, sector3} = useSectorColors();
	const [sector, setSector]         = useState<string | undefined>();
	const {data: {circuit}}           = useCircuitByRef(circuitRef);

	// Stable per-render class so the scoped `<style>` rules only target this
	// instance's SVG (multiple maps can render on the same page).
	const id        = useId().replace(/[^a-zA-Z0-9_-]/g, '-');
	const className = `circuit-map-${id}`;

	const mapSVG = getMapSVG(circuitRef, {height, width, 'aria-label': `${circuit.fullName} Map`, ...svgProps} as SVGProps<SVGSVGElement> & CSSProperties);

	if (!mapSVG) {
		return null;
	}

	if (variant === 'simple') {
		return (
			<Suspense>
				<div className={className}>
					<CircuitMapStyles className={className} variant={variant} sector={sector}/>
					{mapSVG}
				</div>
			</Suspense>
		);
	}

	return (
		<Suspense>
			<Grid container spacing={2} justifyContent="flex-end">
				<Grid item>
					<ToggleGroup
						type="single"
						size="sm"
						value={sector ?? ''}
						onValueChange={(value) => setSector(value || undefined)}
						aria-hidden
					>
						<ToggleGroupItem value="1"><FontAwesomeIcon icon={faSquareFull} color={sector1}/>&nbsp;Sector 1</ToggleGroupItem>
						<ToggleGroupItem value="2"><FontAwesomeIcon icon={faSquareFull} color={sector2}/>&nbsp;Sector 2</ToggleGroupItem>
						<ToggleGroupItem value="3"><FontAwesomeIcon icon={faSquareFull} color={sector3}/>&nbsp;Sector 3</ToggleGroupItem>
					</ToggleGroup>
				</Grid>
				<Grid item xs={12} className={className}>
					<CircuitMapStyles className={className} variant={variant} sector={sector}/>
					{mapSVG}
				</Grid>
			</Grid>
		</Suspense>
	);
};
