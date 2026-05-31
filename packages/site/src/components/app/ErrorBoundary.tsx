import { Component, ComponentProps, ErrorInfo } from 'react';
import { faFlag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, Card, Container, Typography, useTheme } from '@mui/material';

type ErrorBoundaryState = {
	hasError: boolean;
	error?: Error;
};

export function ErrorCard({ message }: { message?: string }) {
	const theme = useTheme();

	const background = theme.palette.error.dark;
	const color = `contrast-color(${background})`;

	return (
		<Container maxWidth="md">
			<Card>
				<Alert
					className="px-8 py-4"
					severity="error"
					variant="filled"
					icon={<FontAwesomeIcon icon={faFlag} color={color} size="2x" />}
				>
					<Typography variant="h2">{message}</Typography>
				</Alert>
			</Card>
		</Container>
	);
}

// biome-ignore lint/suspicious/noExplicitAny: generic
export default class ErrorBoundary extends Component<any, ErrorBoundaryState> {
	// biome-ignore lint/suspicious/noExplicitAny: generic
	constructor(props: ComponentProps<any>) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: Error) {
		// Update state so the next render will show the fallback UI.
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error(error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return <ErrorCard message={this.state.error?.message} />;
		}

		return this.props.children;
	}
}
