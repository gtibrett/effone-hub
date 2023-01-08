import { RefObject, useEffect, useState } from 'react';

type ComponentDimensions = {
	width: number;
	height: number;
};

const getDimensions = (ref: RefObject<HTMLElement | HTMLDivElement | undefined>) => {
	const width = ref?.current?.offsetWidth || 0;
	const height = ref?.current?.offsetHeight || 0;

	return {
		width,
		height
	};
};

const useComponentDimensions = (ref: RefObject<HTMLElement | HTMLDivElement | undefined>): ComponentDimensions => {
	const [dimensions, setDimensions] = useState<ComponentDimensions>({ width: 0, height: 0 });

	useEffect(() => {
		const handleResize = () => {
			setDimensions(getDimensions(ref));
		};

		if (ref.current) {
			setDimensions(getDimensions(ref));
		}

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [ref]);

	return dimensions;
};

export default useComponentDimensions;
