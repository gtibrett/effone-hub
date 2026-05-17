/**
 * ESLint flat config — Next 16 removed the `next lint` shim, so we run
 * `eslint .` directly. eslint-config-next 16 ships native flat-config
 * exports, so no @eslint/eslintrc compat shim is needed.
 */
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';

export default [
	...nextCoreWebVitals,
	{
		ignores: [
			'.next/**',
			'build/**',
			'coverage/**',
			'src/gql/**',
			'node_modules/**'
		]
	},
	{
		rules: {
			'no-mixed-spaces-and-tabs': 'off',
			// eslint-plugin-react-hooks v7 added this rule. It flags valid
			// hydration-gate and async-initialization patterns
			// (`useEffect(() => setX(true), [])`). The constructive fix is
			// `useSyncExternalStore` everywhere, which is heavier than the
			// pattern it would replace. Disabled until we move off the
			// `'use client'` gates entirely.
			'react-hooks/set-state-in-effect': 'off',
			// TanStack Table column defs use inline cell renderers (arrow
			// functions returning JSX). Each is technically a "component",
			// but the rule's expected fix (display-name) is incompatible
			// with the columnHelper pattern. Off across the board.
			'react/display-name': 'off'
		}
	},
	{
		// NivoTooltipFactory is an HOC that calls hooks at its top level and
		// returns a memoized component — fragile but pre-existing. Tests that
		// exercise it must call the factory inside render. Will retire when
		// NivoTooltipFactory is rewritten as a regular component.
		files: ['**/*.test.{ts,tsx}'],
		rules: {
			'react-hooks/static-components': 'off'
		}
	}
];
