import {useEffTheme} from '@/components/ui';
import {faFlag} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Alert, Card, Container, Typography} from '@mui/material';
import {Component, ComponentProps, ErrorInfo} from 'react';

type ErrorBoundaryState = {
	hasError: boolean;
	error?: Error;
}

export function ErrorCard({message}: { message?: string }) {
	const theme = useEffTheme('dark');
	
	const background = theme.palette.error.dark;
	const color      = theme.palette.getContrastText(background);
	
	return (
		<Container maxWidth="md">
			<Card>
				<Alert sx={{py: 2, px: 4}} severity="error" variant="filled" icon={<FontAwesomeIcon icon={faFlag} color={color} size="2x"/>}>
					<Typography variant="h2">{message}</Typography>
				</Alert>
			</Card>
		</Container>
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