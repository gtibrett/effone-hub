import {PropsWithChildren, useEffect} from 'react';
import ReactGA from 'react-ga4';
import {useLocation} from 'react-router';

const GA_TRACKING_ID: string | undefined = process.env.REACT_APP_GA_TRACKING_ID;

declare global {
	interface Window {
		gtag?: (ev: string, ...args: any) => void;
	}
}

export default function GoogleAnalyticsProvider({children}: PropsWithChildren) {
	const location = useLocation();
	
	useEffect(() => {
		if (GA_TRACKING_ID && window.gtag) {
			ReactGA.initialize(GA_TRACKING_ID);
		}
	}, []);
	
	useEffect(() => {
		if (GA_TRACKING_ID && window.gtag) {
			window.gtag('event', 'page_view', {
				page_location: `${window.location.origin}${location.pathname}`
			});
		}
	}, [location.pathname]);
	
	return <>{children}</>;
};