import getCircuitDescription from './getCircuitDescription';

describe('getCircuitDescription.ts', () => {
	test('Get Monaco', async () => {
		const description = getCircuitDescription('monaco');
		
		expect(description).toContain('Circuit de Monaco');
	});
	
	test('Get unknown circuit', async () => {
		const description = getCircuitDescription('shenny');
		
		expect(description).toBe(undefined);
	});
});