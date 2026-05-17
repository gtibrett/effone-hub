'use client';

/**
 * Reads the live computed values of the design-token CSS variables. The
 * only legitimate JS-side consumer is the Nivo bridge (which needs
 * concrete color strings to feed into the chart theme); everything else
 * should use Tailwind utility classes.
 *
 * Re-renders when the user toggles OS color scheme (we read `useDarkMode`
 * to bust the snapshot).
 *
 * Tokens are stored in `globals.css` as fully-formed `color(display-p3 ...)`
 * literals, so this hook just reads the var verbatim — no `hsl()` wrapping.
 */
import {useEffect, useState} from 'react';
import useDarkMode from './useDarkMode';

export type CssTokens = {
	background:            string;
	foreground:            string;
	card:                  string;
	cardForeground:        string;
	popover:               string;
	popoverForeground:     string;
	primary:               string;
	primaryForeground:     string;
	secondary:             string;
	secondaryForeground:   string;
	muted:                 string;
	mutedForeground:       string;
	accent:                string;
	accentForeground:      string;
	destructive:           string;
	destructiveForeground: string;
	border:                string;
	input:                 string;
	ring:                  string;
};

// jsdom doesn't resolve CSS custom properties, and Nivo's color
// machinery can't parse `color(...)` syntax through MUI's old
// `decomposeColor` port — so SSR + tests use these sRGB hex literals
// (chosen to match the display-p3 values declared in `globals.css`).
// In a real browser, `getComputedStyle` returns the live color() value
// and these fallbacks are never used.
const EMPTY_TOKENS: CssTokens = {
	background:            '#b0bec5',
	foreground:            '#000000',
	card:                  '#ffffff',
	cardForeground:        '#000000',
	popover:               '#ffffff',
	popoverForeground:     '#000000',
	primary:               '#37474f',
	primaryForeground:     '#ffffff',
	secondary:             '#bf360c',
	secondaryForeground:   '#ffffff',
	muted:                 '#eceff1',
	mutedForeground:       '#37474f',
	accent:                '#37474f',
	accentForeground:      '#ffffff',
	destructive:           '#f44336',
	destructiveForeground: '#ffffff',
	border:                '#90a4ae',
	input:                 '#90a4ae',
	ring:                  '#37474f'
};

function readTokens(): CssTokens {
	if (typeof window === 'undefined') return EMPTY_TOKENS;
	const s   = getComputedStyle(document.documentElement);
	const get = (name: string, fallback: string) => s.getPropertyValue(name).trim() || fallback;
	return {
		background:            get('--background',             EMPTY_TOKENS.background),
		foreground:            get('--foreground',             EMPTY_TOKENS.foreground),
		card:                  get('--card',                   EMPTY_TOKENS.card),
		cardForeground:        get('--card-foreground',        EMPTY_TOKENS.cardForeground),
		popover:               get('--popover',                EMPTY_TOKENS.popover),
		popoverForeground:     get('--popover-foreground',     EMPTY_TOKENS.popoverForeground),
		primary:               get('--primary',                EMPTY_TOKENS.primary),
		primaryForeground:     get('--primary-foreground',     EMPTY_TOKENS.primaryForeground),
		secondary:             get('--secondary',              EMPTY_TOKENS.secondary),
		secondaryForeground:   get('--secondary-foreground',   EMPTY_TOKENS.secondaryForeground),
		muted:                 get('--muted',                  EMPTY_TOKENS.muted),
		mutedForeground:       get('--muted-foreground',       EMPTY_TOKENS.mutedForeground),
		accent:                get('--accent',                 EMPTY_TOKENS.accent),
		accentForeground:      get('--accent-foreground',      EMPTY_TOKENS.accentForeground),
		destructive:           get('--destructive',            EMPTY_TOKENS.destructive),
		destructiveForeground: get('--destructive-foreground', EMPTY_TOKENS.destructiveForeground),
		border:                get('--border',                 EMPTY_TOKENS.border),
		input:                 get('--input',                  EMPTY_TOKENS.input),
		ring:                  get('--ring',                   EMPTY_TOKENS.ring)
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
