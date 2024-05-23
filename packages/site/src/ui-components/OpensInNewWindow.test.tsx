import {render, screen} from '@testing-library/react';
import axe from 'axe-core';
import OpensInNewWindow from './OpensInNewWindow';

describe('OpensInNewWindow.tsx', () => {
	test('Render', async () => {
		render(<OpensInNewWindow/>);
		
		expect(screen.getByText('(opens in a new window)')).toBeInTheDocument();
	});
	
	test('a11y check', async () => {
		const {container} = render(<OpensInNewWindow/>);
		
		const results = await axe.run(container);
		expect(results.violations.length).toBe(0);
	});
});