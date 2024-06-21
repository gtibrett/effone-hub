const fs   = require('fs');
const path = require('path');

// list used nivo packages
const nivoPackages = [
	'annotations',
	'arcs',
	'axes',
	'bar',
	'boxplot',
	'bump',
	'colors',
	'core',
	'geo',
	'legends',
	'line',
	'pie',
	'radar',
	'scales',
	'sunburst',
	'swarmplot',
	'tooltip',
	'voronoi'
];

nivoPackages.forEach((package) => {
	const filePath = path.join(__dirname, '../', 'node_modules', `@nivo/${package}`, 'dist', `nivo-${package}.cjs.js`);
	if (fs.existsSync(filePath)) {
		fs.unlinkSync(filePath, (err) => {
			if (err) throw err;
			console.log(`Deleted: ${filePath}`);
		});
	}
});

console.info('Nivo CJS files deleted: ', nivoPackages.join(', '));