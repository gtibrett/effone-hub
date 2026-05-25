import {render, screen} from '@testing-library/react';
import SkipNav from './SkipNav';

/**
 * Regression smoke for the SkipNav fork. The original crash was at
 * import-time of the upstream component: its `alpha(theme.palette.background.paper, .9)`
 * call threw because the palette held a `var(--color-*)` string.
 *
 * The local fork drops MUI's alpha entirely in favor of a Tailwind
 * utility (`bg-background-paper/10`). This test simply mounts it and
 * asserts the link renders — if anyone re-introduces MUI's alpha on a
 * var() input here, the render itself will throw.
 */
describe('SkipNav (local fork)', () => {
	test('renders without throwing on var()-backed palette', () => {
		expect(() => render(<SkipNav selector="main"/>)).not.toThrow();
		const link = screen.getByRole('link', {name: /skip navigation/i});
		expect(link).toBeInTheDocument();
	});

	test('uses the sr-only / focus:not-sr-only idiom', () => {
		render(<SkipNav selector="main"/>);
		const link = screen.getByRole('link', {name: /skip navigation/i});
		expect(link.className).toContain('sr-only');
		expect(link.className).toContain('focus:not-sr-only');
	});
});
