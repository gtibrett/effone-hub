import {rgbToHex} from '@mui/system';
import {Constructor} from '../types/ergast';

type ConstructorWithColor = Constructor & {
	color?: string;
}

const constructors: ConstructorWithColor[]            = require('./all.json');
const constructorsWithNoColor: ConstructorWithColor[] = constructors.filter(c => !c.color);

export const getColorByConstructorId = (id?: string) => {
	const constructor = constructors.find(c => c.constructorId === id);
	
	if (!constructor) {
		return '#EEEEEE'; // faint line for unknown constructors
	}
	
	if (constructor.color) {
		return constructor.color;
	}
	
	const index = constructorsWithNoColor.findIndex(c => c.constructorId === id) + 1;
	const color = Math.floor(0 + (index / constructorsWithNoColor.length * 128));
	
	return rgbToHex(`rgb(${color},${color},${color})`);
};