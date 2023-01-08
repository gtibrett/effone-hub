export const getColorByConstructorId = (id?: string) => {
	switch (id) {
		case 'red_bull':
			return '#16185B';
		case 'ferrari':
			return '#EA3323';
		case 'mercedes':
			return '#5FCFBE';
		case 'alpine':
			return '#111C2B';
		case 'mclaren':
			return '#EE8733';
		case 'alfa':
			return '#8C1A11';
		case 'aston_martin':
			return '#24564F';
		case 'haas':
			return '#DA3742';
		case 'alphatauri':
			return '#27284C';
		case 'williams':
			return '#479EDA';
	}
};