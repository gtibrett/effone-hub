import {useGetAccessibleChartColors} from '@/hooks';
import {useCssTokens} from '@/lib/cssTokens';
import {render, screen} from '@testing-library/react';
import axe from 'axe-core';
import {NivoTooltipFactory, useNivoTheme} from './index';

describe('nivo.ts', () => {
	test('useNivoTheme hook', async () => {
		// Snapshot-style: useNivoTheme should expose token-derived strings for
		// text color and axis legend fill. We render a small probe component
		// and check both fields match what useCssTokens() returns.
		const probe: {tokens?: ReturnType<typeof useCssTokens>} = {};

		const TestComponent = () => {
			const tokens    = useCssTokens();
			const nivoTheme = useNivoTheme();
			Object.assign(probe, {tokens});
			return (
				<>
					<div data-testid="textColor">{nivoTheme.text?.color}</div>
					<div data-testid="axisText">{nivoTheme.axis?.legend?.text?.fill}</div>
				</>
			);
		};

		render(<TestComponent/>);

		expect(probe.tokens).toBeDefined();
		expect(screen.getByTestId('textColor')).toHaveTextContent(probe.tokens!.foreground);
		expect(screen.getByTestId('axisText')).toHaveTextContent(probe.tokens!.mutedForeground);
	});

	describe('useGetChartColorsByConstructor hook', () => {
		const TestComponent = () => {
			const getAccessibleChartColors = useGetAccessibleChartColors();
			const tokens                   = useCssTokens();

			const unknown  = getAccessibleChartColors(tokens.foreground, true);
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

		test('light mode (jsdom default)', async () => {
			render(<TestComponent/>);

			// In jsdom matchMedia returns false → light mode. The `force=true`
			// branches pass color through unchanged; the a11y branch may shift
			// the color via the local colorManipulator port.
			expect(screen.getByTestId('mercedes')).toHaveTextContent(/#5fcfbe/i);
			expect(screen.getByTestId('mclaren')).toHaveTextContent(/#ef8833/i);
			// Tolerate either form: original hex if contrast already meets the
			// threshold, or shifted rgb() after a couple of darken steps.
			expect(screen.getByTestId('a11y').textContent).toMatch(/(#ef8833|rgb\(\d+,\s*\d+,\s*\d+\))/);
		});
	});

	describe('NivoTooltip.tsx', () => {
		// NivoTooltipFactory calls hooks (useNivoTheme, useCssTokens) at its
		// top level, so it must be invoked inside a component during render —
		// not at test top level. The inner Component reference is module-stable
		// to keep react-hooks/static-components happy.
		const TooltipBody = () => <div>tooltip content</div>;
		const NivoTooltipHost = () => {
			const NivoTooltippedContent = NivoTooltipFactory(TooltipBody);
			return <NivoTooltippedContent/>;
		};

		test('Render', async () => {
			render(<NivoTooltipHost/>);

			expect(screen.getByText('tooltip content')).toBeInTheDocument();
		});

		test('a11y check', async () => {
			const {container} = render(<NivoTooltipHost/>);

			const results = await axe.run(container);
			expect(results.violations.length).toBe(0);
		});
	});
});
