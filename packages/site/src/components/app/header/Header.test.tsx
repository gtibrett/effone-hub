import axe from 'axe-core';
import { act, render, screen, within } from '@testing-library/react';

import { resizeScreenSize } from '@/jest';

import Header from './Header';

describe('Header.tsx', () => {
	test('Render Nav', async () => {
		render(<Header />);

		expect(screen.getByLabelText(/main navigation/i)).toBeInTheDocument();
	});

	test('Hamburger Nav Test', async () => {
		resizeScreenSize(500);
		render(<Header />);

		const hamburgerButton = screen.getByRole('button', { name: /toggle navigation menu/i });
		expect(hamburgerButton).toBeInTheDocument();

		await act(() => {
			hamburgerButton.click();
		});

		const constructorMenuRegex = /constructors/i;
		const menu = screen.getByRole('menu', { name: /toggle navigation menu/i });
		const constructorMenuItem = within(menu).getByText(constructorMenuRegex);

		expect(constructorMenuItem).toBeInTheDocument();

		await act(() => constructorMenuItem.click());

		// TODO: closing menu isn't working in the test
		// expect(screen.getByText(/about/i)).toBeEmpty();
	});

	test('a11y check', async () => {
		const { container } = render(<Header />);

		const results = await axe.run(container);
		expect(results.violations.length).toBe(0);
	});

	test('a11y check: 320', async () => {
		resizeScreenSize(320);

		const { container } = render(<Header />);

		const results = await axe.run(container);
		expect(results.violations.length).toBe(0);
	});
});
