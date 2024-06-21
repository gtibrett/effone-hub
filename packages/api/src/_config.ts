import dotenv from 'dotenv';

const parsed = dotenv.config();

export default function config () {
	if (parsed.error) {
		console.error(parsed.error);
		throw new Error('Configuration not loaded');
	}
	
	console.info('Configuration loaded');
}