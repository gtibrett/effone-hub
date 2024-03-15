import {createTheme, Theme, ThemeProvider, useTheme} from '@mui/material';
import {render, screen} from '@testing-library/react';
import axe from 'axe-core';
import {PropsWithChildren} from 'react';
import {NivoTooltip, useGetAccessibleChartColors, useNivoTheme} from './nivo';
import {useEffTheme} from './Theme';

const TestAppContainer = ({mode, children}: PropsWithChildren<{ mode: Theme['palette']['mode'] }>) => {
	const theme = useEffTheme(mode);
	
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

describe('nivo.ts', () => {
	test('useNivoTheme hook', async () => {
		const theme         = createTheme();
		const TestComponent = () => {
			const nivoTheme = useNivoTheme();
			return (
				<>
					<div data-testid="textColor">{nivoTheme.text?.color}</div>
					<div data-testid="axisText">{nivoTheme.axis?.legend?.text?.fill}</div>
				</>
			);
		};
		
		render(
			<ThemeProvider theme={theme}>
				<TestComponent/>
			</ThemeProvider>
		);
		
		expect(screen.getByTestId('textColor')).toHaveTextContent(theme.palette.text.primary);
		expect(screen.getByTestId('axisText')).toHaveTextContent(theme.palette.text.secondary);
	});
	
	describe('useGetChartColorsByConstructor hook', () => {
		const TestComponent = () => {
			const getAccessibleChartColors = useGetAccessibleChartColors();
			const theme                    = useTheme();
			
			const unknown  = getAccessibleChartColors(theme.palette.text.primary, true);
			const mercedes = getAccessibleChartColors('#5fcfbe', true);
			const mclaren  = getAccessibleChartColors('#ef8833', true);
			const a11y     = getAccessibleChartColors('#ef8833');
			
			return (
				<>
					<div data-testid="unknown">{unknown[0]}</div>
					<div data-testid="mercedes">{mercedes[0]}</div>
					<div data-testid="mclaren">{mclaren[0]}</div>
					<div data-testid="a11y">{a11y[0]}</div>
				</>
			);
		};
		
		test('light mode', async () => {
			render(
				<TestAppContainer mode="light">
					<TestComponent/>
				</TestAppContainer>
			);
			
			expect(screen.getByTestId('unknown')).toHaveTextContent('rgba(0, 0, 0, 0.87)');
			expect(screen.getByTestId('mercedes')).toHaveTextContent(/#5fcfbe/i);
			expect(screen.getByTestId('mclaren')).toHaveTextContent(/#ef8833/i);
			expect(screen.getByTestId('a11y')).toHaveTextContent('rgb(191, 88, 3)');
		});
		
		test('dark mode', async () => {
			render(
				<TestAppContainer mode="dark">
					<TestComponent/>
				</TestAppContainer>
			);
			
			expect(screen.getByTestId('unknown')).toHaveTextContent('#fff');
			expect(screen.getByTestId('mercedes')).toHaveTextContent(/#5fcfbe/i);
			expect(screen.getByTestId('mclaren')).toHaveTextContent(/#ef8833/i);
			expect(screen.getByTestId('a11y')).toHaveTextContent('#ef8833');
		});
	});
	
	describe('NivoTooltip.tsx', () => {
		test('Render', async () => {
			const NivoTooltippedContent = NivoTooltip(() => <div>tooltip content</div>);
			render(
				<NivoTooltippedContent/>
			);
			
			expect(screen.getByText('tooltip content')).toBeInTheDocument();
		});
		
		test('a11y check', async () => {
			const NivoTooltippedContent = NivoTooltip(() => <div>tooltip content</div>);
			const {container}           = render(
				<NivoTooltippedContent/>
			);
			
			const results = await axe.run(container);
			expect(results.violations.length).toBe(0);
		});
	});
});