import {resizeScreenSize} from '@effonehub/jest';
import {act, render, screen} from '@testing-library/react';
import axe from 'axe-core';
import {BrowserRouter} from 'react-router-dom';
import Header from './Header';

describe('Header.tsx', () => {
	test('Render Nav', async () => {
		render(<>
			<BrowserRouter>
				<Header/>
			</BrowserRouter>
		</>);
		
		expect(screen.getByLabelText(/main navigation/i)).toBeInTheDocument();
	});
	
	test('Hamburger Nav Test', async () => {
		resizeScreenSize(500);
		
		render(<>
			<BrowserRouter>
				<Header/>
			</BrowserRouter>
		</>);
		
		const hamburgerButton = screen.getByText('toggle navigation menu');
		expect(hamburgerButton).toBeInTheDocument();
		
		await act(() => {
			hamburgerButton.closest('button')?.click();
		});
		
		const constructorMenuRegex = /constructors/i;
		const constructorMenuItem  = screen.getByText(constructorMenuRegex);
		
		expect(constructorMenuItem).toBeInTheDocument();
		
		await act(() => constructorMenuItem.click());
		
		// TODO: closing menu isn't working in the test
		// expect(screen.getByText(/about/i)).toBeEmpty();
	});
	
	test('a11y check', async () => {
		const {container} = render(<>
			<BrowserRouter>
				<Header/>
			</BrowserRouter>
		</>);
		
		const results = await axe.run(container);
		expect(results.violations.length).toBe(0);
	});
	
	test('a11y check: 320', async () => {
		resizeScreenSize(320);
		
		const {container} = render(<>
			<BrowserRouter>
				<Header/>
			</BrowserRouter>
		</>);
		
		const results = await axe.run(container);
		expect(results.violations.length).toBe(0);
	});
});