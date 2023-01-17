import {Backdrop} from '@mui/material';
import {PropsWithChildren, useEffect, useState} from 'react';
import {useLocation} from 'react-router';

const GA_TRACKING_ID: string | undefined = process.env.REACT_APP_GA_TRACKING_ID;

declare global {
	interface Window {
		gtag?: (ev: string, ...args: any) => void;
	}
}

export default function GoogleAnalyticsProvider({children}: PropsWithChildren) {
	const [ready, setReady] = useState<boolean>(false);
	const location          = useLocation();
	
	useEffect(() => {
		if (GA_TRACKING_ID && window.gtag) {
			window.gtag('js', new Date());
			window.gtag('config', GA_TRACKING_ID);
		}
		
		setReady(true);
	}, []);
	
	useEffect(() => {
		if (GA_TRACKING_ID && window.gtag && ready) {
			window.gtag('event', 'page_view', {
				page_location: `${window.location.origin}${location.pathname}`
			});
		}
	}, [ready, location.pathname]);
	
	if (!ready) {
		return <Backdrop open/>;
	}
	
	return <>{children}</>;
};