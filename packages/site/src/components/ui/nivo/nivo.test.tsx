import {setDarkMode} from '@/jest';
import {useGetAccessibleChartColors} from '@/hooks';
import {createTheme, Theme, ThemeProvider, useTheme} from '@mui/material';
import {render, screen} from '@testing-library/react';
import axe from 'axe-core';
import {PropsWithChildren} from 'react';
import {NivoTooltipFactory, useNivoTheme} from './index';

// Tests for chart-color logic use a flat (non-cssVars) theme so that
// `theme.palette.text.primary` resolves to the mode-specific concrete value
// at JS-read time (under cssVars it would freeze to the default scheme).
// The hooks under test (useDarkMode, useGetAccessibleColor) read OS
// preference via matchMedia, mocked here by setDarkMode().
const TestAppContainer = ({mode, children}: PropsWithChildren<{ mode: Theme['palette']['mode'] }>) => {
	setDarkMode(mode === 'dark');
	const theme = createTheme({palette: {mode}});

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

		// useNivoTheme returns Tailwind cssVar strings so Nivo SVG attrs flip
		// with the OS scheme at paint. Compare against the var() literals,
		// not against any MUI palette JS resolution.
		expect(screen.getByTestId('textColor')).toHaveTextContent('var(--color-text-primary)');
		expect(screen.getByTestId('axisText')).toHaveTextContent('var(--color-text-secondary)');
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
			// useGetAccessibleColor is identity now (no JS contrast shifting);
			// chart line colors pass through as-is.
			expect(screen.getByTestId('a11y')).toHaveTextContent(/#ef8833/i);
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
		// NivoTooltipFactory calls hooks (useNivoTheme, useInvertedTheme) at its
		// top level, so it must be invoked inside a component during render —
		// not at test top level. The inner Component reference is module-stable
		// to keep react-hooks/static-components happy.
		const TooltipBody = () => <div>tooltip content</div>;
		const NivoTooltipHost = () => {
			const NivoTooltippedContent = NivoTooltipFactory(TooltipBody);
			return <NivoTooltippedContent/>;
		};

		test('Render', async () => {
			render(
				<TestAppContainer mode="light">
					<NivoTooltipHost/>
				</TestAppContainer>
			);

			expect(screen.getByText('tooltip content')).toBeInTheDocument();
		});

		test('a11y check', async () => {
			const {container} = render(
				<TestAppContainer mode="light">
					<NivoTooltipHost/>
				</TestAppContainer>
			);

			const results = await axe.run(container);
			expect(results.violations.length).toBe(0);
		});
	});
});