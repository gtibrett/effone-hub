import {faTire, faTruckTow} from '@fortawesome/pro-duotone-svg-icons';
import {faFlag} from '@fortawesome/pro-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Box, Card, CardContent, CardHeader, Grid, Typography} from '@mui/material';
import {red} from '@mui/material/colors';
import React, {Component, ComponentProps, ErrorInfo} from 'react';

type ErrorBoundaryState = {
	hasError: boolean;
	error?: Error;
}

export default class ErrorBoundary extends Component<any, ErrorBoundaryState> {
	constructor(props: ComponentProps<any>) {
		super(props);
		this.state = {hasError: false};
	}
	
	static getDerivedStateFromError(error: Error) {
		
		// Update state so the next render will show the fallback UI.
		return {hasError: true, error};
	}
	
	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error(error, errorInfo);
	}
	
	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return (
				<Card elevation={0}>
					<CardHeader title={(
						<Grid container spacing={2}>
							<Grid item><FontAwesomeIcon icon={faFlag} color={red[500]}/></Grid>
							<Grid item xs>{this.state.error?.message}</Grid>
						</Grid>
					)}/>
					<CardContent>
						<Grid container justifyContent="center">
							<Grid item xs={12} md={6} sx={{textAlign: 'center'}}>
								<Typography sx={{fontSize: {xs: '50vw', md: '50vh'}}}>
									<Box className="fa-layers fa-fw" sx={{'--fa-animation-duration': '5s'}}>
										<FontAwesomeIcon icon={faTruckTow}/>
										<FontAwesomeIcon icon={faTire} transform="shrink-10.5 left-4.5 down-5.5" spin/>
										<FontAwesomeIcon icon={faTire} transform="shrink-10.5 right-5.5 down-5.5" spin/>
									</Box>
								</Typography>
							</Grid>
						</Grid>
					</CardContent>
				</Card>
			);
		}
		
		return this.props.children;
	}
}