'use client';

import {useCallback, useEffect, useState} from 'react';

/**
 * Local port of @gtibrett/mui-additions/useComponentDimensionsWithRef so M9
 * can drop the mui-additions dep without leaving consumers stranded.
 *
 * Tracks the measured node via state (not a ref) so we can return it during
 * render without tripping react-hooks/refs. Same surface as upstream:
 * `{ref, dimensions, node}`.
 */
type ComponentDimensions = {
	width:  number;
	height: number;
};

export default function useComponentDimensionsWithRef(): {
	ref:        (newNode: HTMLElement | null) => void;
	dimensions: ComponentDimensions;
	node:       HTMLElement | null;
} {
	const [dimensions, setDimensions] = useState<ComponentDimensions>({width: 0, height: 0});
	const [node, setNode]             = useState<HTMLElement | null>(null);

	// Stable callback ref so React doesn't re-invoke it on every render.
	const ref = useCallback((newNode: HTMLElement | null) => {
		setNode(newNode);
	}, []);

	useEffect(() => {
		if (!node) return;

		const handleResize = () => {
			const rect = node.getBoundingClientRect();
			setDimensions({width: rect.width, height: rect.height});
		};

		handleResize();
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [node]);

	return {ref, dimensions, node};
}
