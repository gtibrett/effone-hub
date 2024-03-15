import {Typography} from '@mui/material';
import {render, screen} from '@testing-library/react';
import axe from 'axe-core';
import Page from './Page';

describe('Page.tsx', () => {
	test('Render', async () => {
		render(
			<Page title="page title" subheader="page subheader" action="page action">
				<div>page content</div>
			</Page>
		);
		
		expect(screen.getByText('page title')).toBeInTheDocument();
		expect(screen.getByText('page subheader')).toBeInTheDocument();
		expect(screen.getByText('page content')).toBeInTheDocument();
		expect(screen.getByText('page action')).toBeInTheDocument();
	});
	
	test('Render complex title', async () => {
		render(
			<Page title={<Typography>page title</Typography>} subheader="page subheader">
				<div>page content</div>
			</Page>
		);
		
		expect(screen.getByText('page title')).toBeInTheDocument();
		expect(screen.getByText('page content')).toBeInTheDocument();
	});
	
	
	test('a11y check', async () => {
		const {container} = render(
			<Page title="page title" subheader="page subheader">
				<div>page content</div>
			</Page>
		);
		
		const results = await axe.run(container);
		expect(results.violations.length).toBe(0);
	});
});