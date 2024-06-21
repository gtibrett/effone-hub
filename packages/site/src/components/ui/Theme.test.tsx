import {setDarkMode} from '@/jest';
import {ThemeProvider} from '@mui/material';
import {renderHook} from '@testing-library/react';
import {PropsWithChildren} from 'react';
import {useDarkMode, useEffTheme, useInvertedTheme} from './Theme';

const LightModeWrapper = ({children}: PropsWithChildren) => {
	const theme = useEffTheme('light');
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

const DarkModeWrapper = ({children}: PropsWithChildren) => {
	const theme = useEffTheme('dark');
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

describe('Theme.ts', () => {
	describe('useEffTheme', () => {
		test('light mode', async () => {
			const {result} = renderHook(() => useEffTheme('light'));
			
			expect(result.current.palette.primary.main).toBe('#37474f');
			expect(result.current.palette.secondary.main).toBe('#bf360c');
		});
		
		test('real dark mode', async () => {
			setDarkMode(true);
			
			const {result} = renderHook(() => useEffTheme('dark'));
			
			expect(result.current.palette.primary.main).toBe('#78909c');
			expect(result.current.palette.secondary.main).toBe('#ffab91');
		});
		
		test('forced dark mode', async () => {
			const {result} = renderHook(() => useEffTheme('dark'));
			
			expect(result.current.palette.primary.main).toBe('#78909c');
			expect(result.current.palette.secondary.main).toBe('#ffab91');
		});
	});
	
	test('useInvertedTheme', async () => {
		const {result: light} = renderHook(() => useInvertedTheme(), {wrapper: LightModeWrapper});
		const {result: dark}  = renderHook(() => useInvertedTheme(), {wrapper: DarkModeWrapper});
		
		expect(light.current.palette.mode).toBe('dark');
		expect(dark.current.palette.mode).toBe('light');
	});
	
	test('useDarkMode', async () => {
		const {result: light} = renderHook(() => useDarkMode(), {wrapper: LightModeWrapper});
		const {result: dark}  = renderHook(() => useDarkMode(), {wrapper: DarkModeWrapper});
		
		expect(light.current).toBe(false);
		expect(dark.current).toBe(true);
	});
});

