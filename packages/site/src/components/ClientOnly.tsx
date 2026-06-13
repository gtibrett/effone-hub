import { type PropsWithChildren, useEffect, useState } from 'react';

// biome-ignore lint/suspicious/noExplicitAny: generic
export default function ClientOnly({ children, ...delegated }: PropsWithChildren<any>) {
	const [hasMounted, setHasMounted] = useState(false);

	useEffect(() => {
		setHasMounted(true);
	}, []);

	if (!hasMounted) {
		return null;
	}

	return <div {...delegated}>{children}</div>;
}
