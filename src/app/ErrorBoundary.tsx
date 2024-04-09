import {Page} from '@effonehub/ui-components';
import {faFlag} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Card, CardContent, CardHeader, Container, Typography} from '@mui/material';
import {red} from '@mui/material/colors';
import {Component, ComponentProps, ErrorInfo} from 'react';

type ErrorBoundaryState = {
	hasError: boolean;
	error?: Error;
}

export function ErrorCard({message}: {
	message?: string
}) {
	return (
		<Page title="Red Flag">
			<Container maxWidth="md">
				<Card>
					<CardHeader title="Red Flag" titleTypographyProps={{fontSize: 32}} avatar={<FontAwesomeIcon icon={faFlag} color={red[500]} size="2x"/>}/>
					<CardContent>
						<Typography variant="body1">{message}</Typography>
					</CardContent>
				</Card>
			</Container>
		</Page>
	);
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
			return <ErrorCard message={this.state.error?.message}/>;
		}
		
		return this.props.children;
	}
}