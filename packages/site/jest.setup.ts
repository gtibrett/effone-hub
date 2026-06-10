/**
 * Loaded via jest.config.mjs `setupFilesAfterEnv`.
 * Brings DOM matchers, canvas + localStorage mocks before each test file.
 * Also stubs next/navigation hooks so components that read the router don't
 * crash in jsdom (the App Router runtime is only available inside a real
 * Next request scope).
 */
import '@testing-library/jest-dom';
import 'jest-canvas-mock';
import 'jest-localstorage-mock';

// jsdom env hides Node globals; @mui/x-charts gestures use structuredClone.
if (typeof globalThis.structuredClone !== 'function') {
	globalThis.structuredClone = (val: unknown) => JSON.parse(JSON.stringify(val));
}

jest.mock('next/navigation', () => ({
	useRouter:       () => ({
		push:     jest.fn(),
		replace:  jest.fn(),
		back:     jest.fn(),
		forward:  jest.fn(),
		refresh:  jest.fn(),
		prefetch: jest.fn()
	}),
	usePathname:     () => '/',
	useSearchParams: () => new URLSearchParams(),
	useParams:       () => ({}),
	redirect:        jest.fn(),
	notFound:        jest.fn()
}));
