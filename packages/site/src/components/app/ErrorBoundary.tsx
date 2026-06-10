'use client';

import { Component, ComponentProps, ErrorInfo, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
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
class ErrorBoundaryClass extends Component<any, ErrorBoundaryState> {
	// biome-ignore lint/suspicious/noExplicitAny: generic
	constructor(props: ComponentProps<any>) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: Error) {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error(error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return <ErrorCard message={this.state.error?.message} />;
		}

		return this.props.children;
	}
}

// React class boundaries don't reset on client-side navigation; the cached
// hasError state survives until a full reload. Keying the boundary on
// pathname forces a fresh instance per route, clearing the error when the
// user moves to another page.
export default function ErrorBoundary({ children }: { children: ReactNode }) {
	const pathname = usePathname();
	return <ErrorBoundaryClass key={pathname}>{children}</ErrorBoundaryClass>;
}
