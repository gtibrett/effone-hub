/**
 * Jest config wired through next/jest so SWC handles TS/JSX/CSS without a
 * separate babel.config. We then override `transformIgnorePatterns` AFTER
 * next/jest has merged in its defaults — necessary because next/jest's
 * default ignores everything under node_modules, but d3-*, nivo, and
 * react-spring ship ESM-only and need SWC transformation to be requirable
 * from CJS test code.
 */
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({dir: './'});

/** @type {import('jest').Config} */
const config = {
	testEnvironment:    'jsdom',
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
};

// next/jest's default transformIgnorePatterns swallows our override, so wrap
// the returned async config and rewrite the field post-merge. Pattern handles
// pnpm's `.pnpm/<pkg>@<ver>/node_modules/<pkg>` layout via the optional
// `.pnpm/` prefix.
const esmInNodeModules = '/node_modules/(?!(?:\\.pnpm/)?(?:d3-|internmap|delaunator|robust-predicates|@nivo[+/]|@react-spring[+/]|react-spring))';

export default async () => {
	const finalConfig = await createJestConfig(config)();
	finalConfig.transformIgnorePatterns = [
		esmInNodeModules,
		'^.+\\.module\\.(css|sass|scss)$'
	];
	return finalConfig;
};
