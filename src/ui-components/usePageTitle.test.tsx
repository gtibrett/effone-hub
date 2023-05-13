import usePageTitle from './usePageTitle';

describe('usePageTitle.ts', () => {
	test('set', async () => {
		const title = 'test title';
		usePageTitle(title);
		
		expect(document.title).toBe(`${title} - effOne Hub`);
	});
	
	test('failed set', async () => {
		const title = <span>test title</span>;
		usePageTitle(String(title));
		
		expect(document.title).toBe(`[object Object] - effOne Hub`);
	});
});