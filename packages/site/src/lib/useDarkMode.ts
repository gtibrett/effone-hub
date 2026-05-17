'use client';

/**
 * Single source of truth for "is the user in dark mode?". Reads the OS-level
 * `prefers-color-scheme: dark` media query and re-renders on change. SSR
 * returns `false`; the first client effect re-syncs.
 *
 * Pure CSS-driven theming should rarely need this hook — prefer Tailwind's
 * `dark:` variant (also keyed to the same media query) for styling. Use this
 * only when a JS-time decision needs the mode value, e.g. computing a Nivo
 * chart palette or selecting an accessible foreground for a dynamic team
 * color.
 */
import {useEffect, useState} from 'react';

function getInitial(): boolean {
	if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
	return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export default function useDarkMode(): boolean {
	const [dark, setDark] = useState<boolean>(getInitial);

	useEffect(() => {
		if (typeof window.matchMedia !== 'function') return;
		const mq      = window.matchMedia('(prefers-color-scheme: dark)');
		const handler = () => setDark(mq.matches);
		setDark(mq.matches);
		mq.addEventListener('change', handler);
		return () => mq.removeEventListener('change', handler);
	}, []);

	return dark;
}
