import { createTheme, ThemeProvider } from '@mui/material';
import { renderHook } from '@testing-library/react';

import useChartsTheme from './useChartsTheme';

describe('useChartsTheme', () => {
	function wrap(children: React.ReactNode) {
		const theme = createTheme({
			cssVariables: { colorSchemeSelector: 'data-mui-color-scheme' },
			colorSchemes: { light: true, dark: true }
		});
		return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
	}

	it('returns sx, slotProps, and colors keys', () => {
		const { result } = renderHook(() => useChartsTheme(), {
			wrapper: ({ children }) => wrap(children)
		});
		expect(result.current).toHaveProperty('sx');
		expect(result.current).toHaveProperty('slotProps');
		expect(result.current).toHaveProperty('colors');
		expect(Array.isArray(result.current.colors)).toBe(true);
		expect(result.current.colors.length).toBeGreaterThan(0);
	});

	it('colors uses var(--mui-palette-*) strings, not raw hex', () => {
		const { result } = renderHook(() => useChartsTheme(), {
			wrapper: ({ children }) => wrap(children)
		});
		const serialized = JSON.stringify(result.current);
		expect(serialized).toMatch(/var\(--mui-palette-/);
	});
});
