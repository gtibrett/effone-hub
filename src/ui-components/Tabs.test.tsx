import {act, render, screen} from '@testing-library/react';
import axe from 'axe-core';
import Tabs, {TabContent} from './Tabs';

const tabs: TabContent[] = [
	{
		id:      'first',
		label:   'First',
		content: <span>first tab content</span>
	},
	{
		id:      'second',
		label:   'Second',
		content: <span>second tab content</span>
	},
	{
		id:      'third',
		label:   'Third',
		content: <span>third tab content</span>
	}
];

describe('Tabs.tsx', () => {
	test('Render Tabs', async () => {
		render(<>
			<Tabs tabs={tabs} active="first"/>
		</>);
		
		expect(screen.getByText(/First/)).toBeInTheDocument();
		expect(screen.getByText(/Second/)).toBeInTheDocument();
		expect(screen.getByText(/Third/)).toBeInTheDocument();
	});
	
	test('Render Tabs: Primary Color', async () => {
		render(<>
			<Tabs tabs={tabs} active="first" color="primary"/>
		</>);
		
		expect(screen.getByText(/First/)).toBeInTheDocument();
		expect(screen.getByText(/Second/)).toBeInTheDocument();
		expect(screen.getByText(/Third/)).toBeInTheDocument();
	});
	
	test('Render Tabs: No Active', async () => {
		render(<>
			<Tabs tabs={tabs}/>
		</>);
		
		expect(screen.getByText(/First/)).toBeInTheDocument();
		expect(screen.getByText(/Second/)).toBeInTheDocument();
		expect(screen.getByText(/Third/)).toBeInTheDocument();
	});
	
	test('Change Active Tab', async () => {
		render(<>
			<Tabs tabs={tabs} active="first"/>
		</>);
		
		act(() => screen.getByText(/Second/).click());
		
		expect(screen.getByText(/First/)).toBeInTheDocument();
		expect(screen.getByText(/Second/)).toBeInTheDocument();
		expect(screen.getByText(/Third/)).toBeInTheDocument();
	});
	
	test('a11y check', async () => {
		const {container} = render(<>
			<Tabs tabs={tabs} active="first"/>
		</>);
		
		const results = await axe.run(container);
		expect(results.violations.length).toBe(0);
	});
});