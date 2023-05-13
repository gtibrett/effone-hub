import {useCallback, useEffect, useState} from 'react';

type ComponentDimensions = {
	width: number;
	height: number;
};

const useComponentDimensionsWithRef = (): { ref: any, dimensions: ComponentDimensions, node: HTMLElement | HTMLDivElement | null } => {
	const [node, setNode]             = useState<HTMLElement | HTMLDivElement | null>(null);
	const [dimensions, setDimensions] = useState<ComponentDimensions>({} as ComponentDimensions);
	
	const ref = useCallback((node: HTMLElement | HTMLDivElement | null) => {
		setNode(node);
	}, []);
	
	useEffect(() => {
		if (node) {
			const handleResize = () => setDimensions(node.getBoundingClientRect());
			
			window.addEventListener('resize', handleResize);
			handleResize();
			
			return () => {
				window.removeEventListener('resize', handleResize);
			};
		} else {
			setDimensions({} as ComponentDimensions);
		}
	}, [node]);
	
	return {ref, dimensions, node};
};

export default useComponentDimensionsWithRef;
