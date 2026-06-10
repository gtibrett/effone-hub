import { createTheme, ThemeProvider } from '@mui/material';
import { render } from '@testing-library/react';

import PointsChart from './PointsChart';
import type { RaceStandingsWithEntities } from './types';

function Wrap({ children }: { children: React.ReactNode }) {
	const theme = createTheme({
		cssVariables: { colorSchemeSelector: 'data-mui-color-scheme' },
		colorSchemes: { light: true, dark: true }
	});
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

const DummyTooltip = () => <div data-testid="tt">tooltip</div>;

describe('PointsChart', () => {
	it('renders nothing when data is empty', () => {
		const { container } = render(
			<Wrap>
				<PointsChart data={[]} TooltipComponent={DummyTooltip} />
			</Wrap>
		);
		expect(container.firstChild).toBeNull();
	});

	it('renders an SVG given representative data', () => {
		const data: RaceStandingsWithEntities[] = [
			{
				round: 1,
				standings: [
					{
						id: 'driver-1',
						entity: { id: 'd1', name: 'Verstappen', color: '#1E5BC6' },
						points: 25,
						position: 1
					}
				]
			},
			{
				round: 2,
				standings: [
					{
						id: 'driver-1',
						entity: { id: 'd1', name: 'Verstappen', color: '#1E5BC6' },
						points: 43,
						position: 1
					}
				]
			}
		];
		const { container } = render(
			<Wrap>
				<PointsChart data={data} TooltipComponent={DummyTooltip} />
			</Wrap>
		);
		expect(container.querySelector('svg')).not.toBeNull();
	});
});
