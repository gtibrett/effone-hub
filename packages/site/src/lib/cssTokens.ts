'use client';

/**
 * Reads the live computed values of the design-token CSS variables. The
 * only legitimate JS-side consumer is the Nivo bridge (which needs concrete
 * `hsl(...)` strings to feed into the chart theme); everything else should
 * be using Tailwind utility classes.
 *
 * Re-renders when the user toggles their OS color scheme (we wedge a
 * `useDarkMode()` call in so React knows to bust the snapshot).
 */
import {useEffect, useState} from 'react';
import useDarkMode from './useDarkMode';

export type CssTokens = {
	background:          string;
	foreground:          string;
	card:                string;
	cardForeground:      string;
	popover:             string;
	popoverForeground:   string;
	primary:             string;
	primaryForeground:   string;
	secondary:           string;
	secondaryForeground: string;
	muted:               string;
	mutedForeground:     string;
	accent:              string;
	accentForeground:    string;
	destructive:         string;
	destructiveForeground: string;
	border:              string;
	input:               string;
	ring:                string;
};

const EMPTY_TOKENS: CssTokens = {
	background:            'hsl(0 0% 100%)',
	foreground:            'hsl(0 0% 0%)',
	card:                  'hsl(0 0% 100%)',
	cardForeground:        'hsl(0 0% 0%)',
	popover:               'hsl(0 0% 100%)',
	popoverForeground:     'hsl(0 0% 0%)',
	primary:               'hsl(200 18% 26%)',
	primaryForeground:     'hsl(0 0% 100%)',
	secondary:             'hsl(14 100% 36%)',
	secondaryForeground:   'hsl(0 0% 100%)',
	muted:                 'hsl(204 15% 94%)',
	mutedForeground:       'hsl(200 18% 26%)',
	accent:                'hsl(200 18% 26%)',
	accentForeground:      'hsl(0 0% 100%)',
	destructive:           'hsl(0 84% 60%)',
	destructiveForeground: 'hsl(0 0% 100%)',
	border:                'hsl(210 17% 70%)',
	input:                 'hsl(210 17% 70%)',
	ring:                  'hsl(200 18% 26%)'
};

function readTokens(): CssTokens {
	if (typeof window === 'undefined') return EMPTY_TOKENS;
	const s   = getComputedStyle(document.documentElement);
	const hsl = (name: string, fallback: string) => {
		const v = s.getPropertyValue(name).trim();
		return v ? `hsl(${v})` : fallback;
	};
	// Fall back to baked-in defaults when getComputedStyle returns empty —
	// jsdom doesn't resolve CSS custom properties at all, so tests would
	// otherwise see empty strings and crash on downstream `decomposeColor`.
	return {
		background:            hsl('--background',             EMPTY_TOKENS.background),
		foreground:            hsl('--foreground',             EMPTY_TOKENS.foreground),
		card:                  hsl('--card',                   EMPTY_TOKENS.card),
		cardForeground:        hsl('--card-foreground',        EMPTY_TOKENS.cardForeground),
		popover:               hsl('--popover',                EMPTY_TOKENS.popover),
		popoverForeground:     hsl('--popover-foreground',     EMPTY_TOKENS.popoverForeground),
		primary:               hsl('--primary',                EMPTY_TOKENS.primary),
		primaryForeground:     hsl('--primary-foreground',     EMPTY_TOKENS.primaryForeground),
		secondary:             hsl('--secondary',              EMPTY_TOKENS.secondary),
		secondaryForeground:   hsl('--secondary-foreground',   EMPTY_TOKENS.secondaryForeground),
		muted:                 hsl('--muted',                  EMPTY_TOKENS.muted),
		mutedForeground:       hsl('--muted-foreground',       EMPTY_TOKENS.mutedForeground),
		accent:                hsl('--accent',                 EMPTY_TOKENS.accent),
		accentForeground:      hsl('--accent-foreground',      EMPTY_TOKENS.accentForeground),
		destructive:           hsl('--destructive',            EMPTY_TOKENS.destructive),
		destructiveForeground: hsl('--destructive-foreground', EMPTY_TOKENS.destructiveForeground),
		border:                hsl('--border',                 EMPTY_TOKENS.border),
		input:                 hsl('--input',                  EMPTY_TOKENS.input),
		ring:                  hsl('--ring',                   EMPTY_TOKENS.ring)
	};
}

export function useCssTokens(): CssTokens {
	const dark               = useDarkMode();
	const [tokens, setTokens] = useState<CssTokens>(readTokens);

	useEffect(() => {
		setTokens(readTokens());
	}, [dark]);

	return tokens;
}
