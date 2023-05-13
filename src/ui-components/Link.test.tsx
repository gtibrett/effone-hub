import {render, screen} from '@testing-library/react';
import axe from 'axe-core';
import {BrowserRouter} from 'react-router-dom';
import Link from './Link';

describe('Link.tsx', () => {
	test('Plain React Router Link: render', async () => {
		render(<>
			<BrowserRouter>
				<Link to="/">Home</Link>
			</BrowserRouter>
		</>);
		
		expect(screen.getByText(/home/i)).toBeInTheDocument();
	});
	
	test('Plain React Router Link: primary color', async () => {
		render(<>
			<BrowserRouter>
				<Link to="/" color="primary">Home</Link>
			</BrowserRouter>
		</>);
		
		expect(screen.getByText(/home/i)).toBeInTheDocument();
	});
	
	test('Plain React Router Link: inherit color', async () => {
		render(<>
			<BrowserRouter>
				<Link to="/" color="inherit">Home</Link>
			</BrowserRouter>
		</>);
		
		expect(screen.getByText(/home/i)).toBeInTheDocument();
	});
	
	test('Plain React Router Link: a11y', async () => {
		const {container} = render(<>
			<BrowserRouter>
				<Link to="/">Home</Link>
			</BrowserRouter>
		</>);
		
		const results = await axe.run(container);
		expect(results.violations.length).toBe(0);
	});
	
	test('Plain Mui Link: render', async () => {
		render(<>
			<BrowserRouter>
				<Link href="/">Home</Link>
			</BrowserRouter>
		</>);
		
		expect(screen.getByText(/home/i)).toBeInTheDocument();
	});
	
	test('Plain Mui Link: a11y', async () => {
		const {container} = render(<>
			<BrowserRouter>
				<Link href="/">Home</Link>
			</BrowserRouter>
		</>);
		
		const results = await axe.run(container);
		expect(results.violations.length).toBe(0);
	});
	
	test('External React Router Link: render', async () => {
		render(<>
			<BrowserRouter>
				<Link to="/" target="_blank">Home</Link>
			</BrowserRouter>
		</>);
		
		expect(screen.getByText(/home/i)).toBeInTheDocument();
	});
	
	test('External React Router Link: a11y', async () => {
		const {container} = render(<>
			<BrowserRouter>
				<Link to="/" target="_blank">Home</Link>
			</BrowserRouter>
		</>);
		
		const results = await axe.run(container);
		expect(results.violations.length).toBe(0);
	});
	
	test('External Mui Link: render', async () => {
		render(<>
			<BrowserRouter>
				<Link href="/" target="_blank">Home</Link>
			</BrowserRouter>
		</>);
		
		expect(screen.getByText(/home/i)).toBeInTheDocument();
	});
	
	test('External Mui Link: a11y', async () => {
		const {container} = render(<>
			<BrowserRouter>
				<Link href="/" target="_blank">Home</Link>
			</BrowserRouter>
		</>);
		
		const results = await axe.run(container);
		expect(results.violations.length).toBe(0);
	});
});