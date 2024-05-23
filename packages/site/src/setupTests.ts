import '@testing-library/jest-dom';
import axe from 'axe-core';

import mediaQuery, {MediaValues} from 'css-mediaquery';
import 'jest-canvas-mock';
import 'jest-localstorage-mock';

axe.configure({
	rules: [
		{
			id: 'wcag2a'
		}, {
			id: 'wcag2aa'
		}
	]
});

function createMatchMedia(mock: Partial<MediaValues>) {
	return (query: string) => {
		return {
			matches:             mediaQuery.match(query, mock),
			media:               '',
			addListener:         () => {
			},
			removeListener:      () => {
			},
			onchange:            () => {
			},
			addEventListener:    () => {
			},
			removeEventListener: () => {
			},
			dispatchEvent:       () => true
		};
	};
}


// @ts-ignore
global.resizeScreenSize = (width: number) => {
	window.matchMedia = createMatchMedia({width});
};

// @ts-ignore
global.setDarkMode = (on: boolean) => {
	window.matchMedia = createMatchMedia({'prefers-color-scheme': on ? 'dark' : 'light'});
};