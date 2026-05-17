import {Alert, AlertTitle} from '@/components/ui/shadcn/alert';
import {faFlag} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Card, Container} from '@mui/material';
import {Component, ComponentProps, ErrorInfo} from 'react';

type ErrorBoundaryState = {
	hasError: boolean;
	error?: Error;
}

export function ErrorCard({message}: { message?: string }) {
	return (
		<Container maxWidth="md">
			<Card>
				<Alert variant="destructive" className="py-4 px-8">
					<FontAwesomeIcon icon={faFlag} size="2x"/>
					<AlertTitle className="text-2xl">{message}</AlertTitle>
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