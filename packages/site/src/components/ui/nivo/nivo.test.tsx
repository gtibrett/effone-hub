import {setDarkMode} from '@/jest';
import {createTheme, Theme, ThemeProvider} from '@mui/material';
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