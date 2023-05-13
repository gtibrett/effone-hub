import {act, render, screen} from '@testing-library/react';
import axe from 'axe-core';
import SkipNav from './SkipNav';

describe('SkipNav.tsx', () => {
	test('Render', async () => {
		render(<>
			<SkipNav/>
		</>);
		
		expect(screen.getByText('Skip navigation')).toBeInTheDocument();
	});
	
	test('Skip Nav', async () => {
		render(<>
				<SkipNav/>
				<main id="main-content" tabIndex={0}>main content</main>
			</>
		);
		
		const skipNav = screen.getByText('Skip navigation');
		
		await act(() => {
			skipNav.click();
		});
		
		const main = screen.getByText('main content');
		
		expect(main).toHaveFocus();
	});
	
	test('a11y check', async () => {
		const {container} = render(<>
				<SkipNav/>
				<main id="main-content" tabIndex={0}>main content</main>
			</>
		);
		
		const results = await axe.run(container);
		expect(results.violations.length).toBe(0);
	});
});