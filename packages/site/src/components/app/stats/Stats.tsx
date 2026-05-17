import {PropsWithChildren} from 'react';

export default function Stats({children}: PropsWithChildren) {
	return (
		<div className="flex flex-row flex-wrap lg:flex-nowrap gap-4 justify-stretch py-0">
			{children}
		</div>
	);
};
