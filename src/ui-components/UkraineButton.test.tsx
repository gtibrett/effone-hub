import {render, screen} from '@testing-library/react';
import axe from 'axe-core';
import {BrowserRouter} from 'react-router-dom';
import UkraineButton from './UkraineButton';

describe('UkraineButton.tsx', () => {
	test('Render', async () => {
		render(<>
			<BrowserRouter>
				<UkraineButton/>
			</BrowserRouter>
		</>);
		
		expect(screen.getByLabelText(/Stand with Ukraine/i)).toBeInTheDocument();
	});
	
	test('a11y check', async () => {
		const {container} = render(<>
			<BrowserRouter>
				<UkraineButton/>
			</BrowserRouter>
		</>);
		
		const results = await axe.run(container);
		expect(results.violations.length).toBe(0);
	});
});