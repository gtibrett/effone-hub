import {PropsWithChildren, useEffect, useState} from "react";

export default function ClientOnly({children, ...delegated}: PropsWithChildren<any>) {
	const [hasMounted, setHasMounted] = useState(false);
	
	useEffect(() => {
		setHasMounted(true);
	}, []);
	
	if (!hasMounted) {
		return null;
	}
	
	return <div {...delegated}>{children}</div>;
}