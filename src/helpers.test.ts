import {getMillisecondsFromTimeString, getPositionTextOutcome, getTimeStringFromDate} from './helpers';

describe('helpers.ts', () => {
	
	describe('getPositionTextOutcome', () => {
	});
	describe('getTimeStringFromDate', () => {
	});
	describe('getMillisecondsFromTimeString', () => {
		const sec = 1000;
		const min = 60 * sec;
		const hr  = 60 * min;
		
		test('+2.709', () => {
			const result = getMillisecondsFromTimeString('+2.709');
			expect(result).toBe(undefined);
		});
		
		test('4:04:39.537', () => {
			const result = getMillisecondsFromTimeString('4:04:39.537');
			expect(result).toBe((4 * hr) + (4 * min) + (39 * sec) + 537);
		});
		
		test('1:39.795', () => {
			const result = getMillisecondsFromTimeString('1:39.795');
			expect(result).toBe((0 * hr) + (1 * min) + (39 * sec) + 795);
		});
	});
});