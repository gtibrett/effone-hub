import mediaQuery, {MediaValues} from 'css-mediaquery';

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

export function resizeScreenSize(width: number) {
	window.matchMedia = createMatchMedia({width});
}

export function setDarkMode(on: boolean) {
	window.matchMedia = createMatchMedia({'prefers-color-scheme': on ? 'dark' : 'light'});
}