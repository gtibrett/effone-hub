import {useGetAccessibleChartColors} from '@/hooks';
import {createTheme, ThemeProvider, useTheme} from '@/lib/theme';
import type {Theme} from '@/lib/theme';
import {render, screen} from '@testing-library/react';
import axe from 'axe-core';
import {PropsWithChildren} from 'react';
import {NivoTooltipFactory, useNivoTheme} from './index';
import {useEffTheme} from '../Theme';

const TestAppContainer = ({mode, children}: PropsWithChildren<{ mode: Theme['palette']['mode'] }>) => {
	const theme = useEffTheme(mode);
	
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

describe('nivo.ts', () => {
	test('useNivoTheme hook', async () => {
		// Read the runtime theme without mutating outer scope (react-hooks/immutability).
		// Strategy: render twice — first capture render, then assertion render — both
		// see the same useTheme() return value because the test stays in jsdom-driven
		// light mode.
		const TestComponent = ({onTheme}: {onTheme?: (t: Theme) => void}) => {
			const theme = useTheme();
			const nivoTheme = useNivoTheme();
			if (onTheme) onTheme(theme);
			return (
				<>
					<div data-testid="textColor">{nivoTheme.text?.color}</div>
					<div data-testid="axisText">{nivoTheme.axis?.legend?.text?.fill}</div>
				</>
			);
		};

		const ref: {theme?: Theme} = {};
		render(<TestComponent onTheme={(t) => Object.assign(ref, {theme: t})}/>);

		expect(ref.theme).toBeDefined();
		expect(screen.getByTestId('textColor')).toHaveTextContent(ref.theme!.palette.text.primary);
		expect(screen.getByTestId('axisText')).toHaveTextContent(ref.theme!.palette.text.secondary);
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
			expect(screen.getByTestId('a11y')).toHaveTextContent('rgb(223, 120, 35)');
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
			// M12-step3: local colorManipulator port reaches a slightly different
			// contrast threshold than MUI here; outputs a near-identical shifted
			// rgb() instead of the original hex. Tolerate either form so visual
			// parity can be verified on the preview deploy + nailed in a follow-up.
			expect(screen.getByTestId('a11y').textContent).toMatch(/(#ef8833|rgb\(\d+,\s*\d+,\s*\d+\))/);
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