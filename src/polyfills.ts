declare global {
	interface Array<T> {
		removeDuplicates: (comparator?: (a: T, b: T) => boolean) => T[];
	}
}

// eslint-disable-next-line no-extend-native
Array.prototype.removeDuplicates = function (comparator = (a, b) => a === b) {
	return this.reduce((prev, cur) => {
		if (!prev.find((val: typeof this[number]) => comparator(val, cur))) {
			prev.push(cur);
		}
		return prev;
	}, []);
};

// necessary for declare global above
// eslint-disable-next-line
export default {};