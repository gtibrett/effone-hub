declare global {
	interface Array<T> {
		removeDuplicates: (comparator?: (a: T, b: T) => boolean) => T[];
		sortByAttribute: (key: keyof T) => T[];
		distinct: () => T[];
	}
}


function onlyUnique<T>(value: T, index: number, array: T[]) {
	return array.indexOf(value) === index;
}

Array.prototype.distinct = function () {
	return this.filter(onlyUnique);
};


// eslint-disable-next-line no-extend-native
Array.prototype.removeDuplicates = function (comparator = (a, b) => a === b) {
	return this.reduce((prev, cur) => {
		if (!prev.find((val: typeof this[number]) => comparator(val, cur))) {
			prev.push(cur);
		}
		return prev;
	}, []);
};

Array.prototype.sortByAttribute = function (key: keyof (typeof this[number])) {
	return this.sort((a, b) => {
		return a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0;
	});
};

// necessary for declare global above
// eslint-disable-next-line
export default {};