import { createTheme, ThemeProvider } from '@mui/material';
import { render } from '@testing-library/react';

import CareerPerformance from './CareerPerformance';

jest.mock('../usePerformanceData', () => ({
	__esModule: true,
	default: () => ({
		appearances: 200,
		wins: 50,
		podiums: 100,
		inPoints: 160,
		DNFs: 20
	})
}));

function Wrap({ children }: { children: React.ReactNode }) {
	const theme = createTheme({
		cssVariables: { colorSchemeSelector: 'data-mui-color-scheme' },
		colorSchemes: { light: true, dark: true }
	});
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

describe('CareerPerformance', () => {
	it('renders an SVG when summary data is present', () => {
		const { container } = render(
			<Wrap>
				{/* @ts-expect-error mocked Apollo prop shape */}
				<CareerPerformance data={{ driver: { raceResults: [] } }} />
			</Wrap>
		);
		expect(container.querySelector('svg')).not.toBeNull();
	});
});
