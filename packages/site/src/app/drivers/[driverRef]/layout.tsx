import type { ReactNode } from 'react';

// The `@dialog` parallel slot hosts the intercepting modal routes
// (@dialog/(.)circuits/[circuitRef], @dialog/(.)seasons/[year]). It renders
// nothing (default.tsx -> null) until one is matched via client navigation.
export default function DriverLayout({
	children,
	dialog
}: {
	children: ReactNode;
	dialog: ReactNode;
}) {
	return (
		<>
			{children}
			{dialog}
		</>
	);
}
