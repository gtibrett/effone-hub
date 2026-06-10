import { createTheme, ThemeProvider } from '@mui/material';
import { render } from '@testing-library/react';

import CareerBreakdownChart from './CareerBreakdownChart';

jest.mock('./useBreakdownData', () => ({
	__esModule: true,
	default: () => [
		{
			year: 2023,
			driverId: 'verstappen',
			raw: { wins: 19, podiums: 2, inPoints: 1, outOfPoints: 0, DNFs: 0, appearances: 22 },
			winsPercentage: 86,
			podiumsPercentage: 9,
			inPointsPercentage: 5,
			outOfPointsPercentage: 0,
			DNFsPercentage: 0,
			appearancesPercentage: 100
		},
		{
			year: 2024,
			driverId: 'verstappen',
			raw: { wins: 9, podiums: 5, inPoints: 5, outOfPoints: 1, DNFs: 4, appearances: 24 },
			winsPercentage: 37,
			podiumsPercentage: 21,
			inPointsPercentage: 21,
			outOfPointsPercentage: 4,
			DNFsPercentage: 17,
			appearancesPercentage: 100
		}
	]
}));

function Wrap({ children }: { children: React.ReactNode }) {
	const theme = createTheme({
		cssVariables: { colorSchemeSelector: 'data-mui-color-scheme' },
		colorSchemes: { light: true, dark: true }
	});
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

describe('CareerBreakdownChart', () => {
	it('renders an SVG when data is present', () => {
		const { container } = render(
			<Wrap>
				<CareerBreakdownChart driverId="verstappen" />
			</Wrap>
		);
		expect(container.querySelector('svg')).not.toBeNull();
	});
});
