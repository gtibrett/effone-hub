import {Breadcrumbs, Grid, Paper} from '@mui/material';
import {PropsWithChildren} from 'react';
import {useLocation, useNavigate} from 'react-router';
import {useAppState} from '../app/AppStateProvider';
import SeasonMenu from '../schedule/SeasonMenu';

export default function Navigation({children}: PropsWithChildren) {
	const {pathname}           = useLocation();
	const navigate             = useNavigate();
	const [{season}, setState] = useAppState();
	
	const setSeason = (value: number) => {
		if (pathname.includes(`/${season}`)) {
			navigate(pathname.replace(`/${season}`, `/${value}`));
		}
		
		setState(cur => ({
			...cur,
			season: value
		}));
	};
	
	return (
		<Paper sx={{p: 2}} elevation={0}>
			<Grid container spacing={1} alignItems="center">
				<Grid item xs>
					<Breadcrumbs separator="|">
						{children}
					</Breadcrumbs>
				</Grid>
				<Grid item><SeasonMenu id="season-select" season={season} setSeason={setSeason}/></Grid>
			</Grid>
		</Paper>
	);
}