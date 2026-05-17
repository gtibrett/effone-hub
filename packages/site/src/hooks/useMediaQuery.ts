'use client';

/**
 * Drop-in for `@mui/material/useMediaQuery`. Accepts either a raw media
 * query string or the `@media (...)` form MUI's `theme.breakpoints.up/down`
 * returns. Both forms work — we strip the leading `@media ` if present.
 */
import {useEffect, useState} from 'react';

export default function useMediaQuery(query: string): boolean {
	const stripped = query.startsWith('@media ') ? query.slice('@media '.length) : query;

	const get = () => {
		if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
		return window.matchMedia(stripped).matches;
	};

	const [matches, setMatches] = useState<boolean>(() => get());

	useEffect(() => {
		if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;
		const mq = window.matchMedia(stripped);
		const handler = () => setMatches(mq.matches);
		setMatches(mq.matches);
		mq.addEventListener('change', handler);
		return () => mq.removeEventListener('change', handler);
	}, [stripped]);

	return matches;
}
