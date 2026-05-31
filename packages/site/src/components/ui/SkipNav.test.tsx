import { render, screen } from '@testing-library/react';

import SkipNav from './SkipNav';

// Regression: upstream `alpha(theme.palette.background.paper, .9)` throws on var()-backed palette.
// Local fork uses `bg-background-paper/10`. Render throws if alpha-on-var is reintroduced.
describe('SkipNav (local fork)', () => {
	test('renders without throwing on var()-backed palette', () => {
		expect(() => render(<SkipNav selector="main" />)).not.toThrow();
		const link = screen.getByRole('link', { name: /skip navigation/i });
		expect(link).toBeInTheDocument();
	});

	test('uses the sr-only / focus:not-sr-only idiom', () => {
		render(<SkipNav selector="main" />);
		const link = screen.getByRole('link', { name: /skip navigation/i });
		expect(link.className).toContain('sr-only');
		expect(link.className).toContain('focus:not-sr-only');
	});
});
