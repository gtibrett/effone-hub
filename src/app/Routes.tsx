import React, {ReactNode} from 'react';
import {Route, RouteProps, Routes as ReactRouterRoutes} from 'react-router-dom';
import {Circuits, Constructors, Driver, Drivers, Home, Race} from '../pages';
import About from '../pages/About';
import Circuit from '../pages/Circuit';
import Constructor from '../pages/Constructor';
import Seasons from '../pages/Seasons';
import {useAppState} from './AppStateProvider';
import ErrorBoundary from './ErrorBoundary';

type NavRoute = {
	path: RouteProps['path'];
	element: RouteProps['element'];
	label?: ReactNode;
	rootPath?: RouteProps['path'];
}

export const useNavLinks = () => {
	const [{currentSeason}] = useAppState();
	
	const navLinks: NavRoute[] = [
		{
			path:     '/',
			label:    currentSeason,
			element:  <Home/>,
			rootPath: `/${currentSeason}`
		},
		{
			path:    `/:season/:round`,
			element: <Race/>
		},
		{
			path:     '/seasons',
			label:    'Past Seasons',
			element:  <Seasons/>,
			rootPath: '/season'
		},
		{
			path:    '/season/:seasonId',
			element: <Home/>
		},
		{
			path:    '/season/:season/:round',
			element: <Race/>
		},
		{
			path:     '/circuits',
			label:    'Circuits',
			element:  <Circuits/>,
			rootPath: '/circuit'
		},
		{
			path:    '/circuit/:circuitId',
			element: <Circuit/>
		},
		{
			path:     '/constructors',
			label:    'Constructors',
			element:  <Constructors/>,
			rootPath: '/constructor'
		},
		{
			path:    '/constructor/:constructorId',
			element: <Constructor/>
		},
		{
			path:     '/drivers',
			label:    'Drivers',
			element:  <Drivers/>,
			rootPath: '/driver'
		},
		{
			path:    '/driver/:driverId',
			element: <Driver/>
		},
		{
			path:    '/about',
			label:   'About',
			element: <About/>
		}
	];
	
	return navLinks;
};

const mapNavLinkToRoute = ({element, path}: NavRoute) => (
	<Route key={path} element={element} path={path}/>
);

export default function Routes() {
	const navLinks = useNavLinks();
	const routes   = navLinks.map(mapNavLinkToRoute);
	
	return (
		<ErrorBoundary>
			<ReactRouterRoutes>
				{routes}
			</ReactRouterRoutes>
		</ErrorBoundary>
	);
}