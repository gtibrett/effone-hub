'use client';

import { useEffect, useRef, useState } from 'react';

export type ComponentDimensions = {
	width: number;
	height: number;
};

// Vendored from @gtibrett/mui-additions (external dep dropped). Callback-ref +
// resize listener reporting the measured element's bounding box.
export default function useComponentDimensionsWithRef() {
	const [dimensions, setDimensions] = useState<ComponentDimensions>({ width: 0, height: 0 });
	const node = useRef<HTMLDivElement | null>(null);

	const ref = (newNode: HTMLDivElement | null) => {
		node.current = newNode;
	};

	useEffect(() => {
		const handleResize = () => {
			if (node.current) {
				const { width, height } = node.current.getBoundingClientRect();
				setDimensions({ width, height });
			}
		};
		window.addEventListener('resize', handleResize);
		handleResize();
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return { ref, dimensions, node: node.current };
}
