import {About} from '@effonehub/about';
import {Circuit, Circuits} from '@effonehub/circuits/pages';
import {Footer, Header} from '@effonehub/components';
import {Constructor, Constructors} from '@effonehub/constructor/pages';
import {Driver, Drivers} from '@effonehub/driver/pages';
import {Race} from '@effonehub/race/pages';
import {Season, Seasons} from '@effonehub/season/pages';
import {SkipNav, UkraineButton} from '@gtibrett/mui-additions';
import {Box, Container, SxProps, useTheme} from '@mui/material';
import {ReactNode} from 'react';
import {Outlet, Route, RouteProps, Routes as ReactRouterRoutes} from 'react-router-dom';
import {useAppState} from './AppStateProvider';
import ErrorBoundary from './ErrorBoundary';

const Layout = () => {
	const theme = useTheme();
	
	const sx: SxProps = {
		py:       2,
		position: 'relative'
	};
	
	return (
		<>
			<SkipNav selector="main"/>
			
			<Box sx={{position: 'fixed', overflow: 'auto', scrollbarColor: theme.palette.mode, top: 0, left: 0, right: 0, bottom: 0, background: theme.palette.background.default}}>
				<Header/>
				
				<Container maxWidth="xl" component="main" sx={sx} tabIndex={0}>
					<ErrorBoundary>
						<Outlet/>
					</ErrorBoundary>
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

export default function Routes() {
	const navLinks = useNavLinks();
	
	return (
		<ReactRouterRoutes>
			<Route element={<Layout/>}>
				{navLinks.map(({element, path}: NavRoute) => <Route key={path} element={element} path={path}/>)}
			</Route>
		</ReactRouterRoutes>
	);
}