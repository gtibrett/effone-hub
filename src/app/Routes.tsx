import {SkipNav, UkraineButton} from '@gtibrett/mui-additions';
import {Box, Container, SxProps, useTheme} from '@mui/material';
import {Header} from '@ui-components';
import {ReactNode} from 'react';
import {Outlet, Route, RouteProps, Routes as ReactRouterRoutes} from 'react-router-dom';
import {Circuits, Constructors, Driver, Drivers, Race} from '../pages';
import About from '../pages/About';
import Circuit from '../pages/Circuit';
import Constructor from '../pages/Constructor';
import Seasons from '../pages/Seasons';
import Season from '../season/Season';
import {useAppState} from './AppStateProvider';
import ErrorBoundary from './ErrorBoundary';
import Footer from './Footer';

export const Layout = () => {
	const theme = useTheme();
	
	const sx: SxProps = {
		py:         2,
		position:   'relative',
		'&:before': {
			position:        'absolute',
			top:             0, left: 0,
			zIndex:          -1,
			width:           '100%',
			height:          '100%',
			content:         '" "',
			backgroundImage: `url(${process.env.PUBLIC_URL}/carbon-fiber-texture.png)`,
			opacity:         theme.palette.mode === 'dark' ? .35 : 1
		}
	};
	
	return (
		<>
			<SkipNav selector="main"/>
			
			<Box sx={{position: 'fixed', overflow: 'auto', scrollbarColor: theme.palette.mode, top: 0, left: 0, right: 0, bottom: 0, background: theme.palette.background.default}}>
				<Header/>
				
				<Container maxWidth="xl" component="main" sx={sx} tabIndex={0}>
					<Outlet/>
				</Container>
				
				<Footer/>
				<UkraineButton/>
			</Box>
		</>
	);
};


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
			element:  <Season/>,
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
			path:    '/season/:season',
			element: <Season/>
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
			path:    '/circuit/:circuitRef',
			element: <Circuit/>
		},
		{
			path:     '/constructors',
			label:    'Constructors',
			element:  <Constructors/>,
			rootPath: '/constructor'
		},
		{
			path:    '/constructor/:teamRef',
			element: <Constructor/>
		},
		{
			path:     '/drivers',
			label:    'Drivers',
			element:  <Drivers/>,
			rootPath: '/driver'
		},
		{
			path:    '/driver/:driverRef',
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
				<Route element={<Layout/>}>
					{routes}
				</Route>
			</ReactRouterRoutes>
		</ErrorBoundary>
	);
}