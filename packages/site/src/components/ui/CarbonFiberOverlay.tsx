import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

import { PropsWithClassName } from '@/types';

import carbonFiberTexture from './images/carbon-fiber-texture.png';

export const CarbonFiberOverlay = ({ className }: PropsWithClassName) => {
	return (
		<Image
			fill
			src={carbonFiberTexture}
			className={twMerge('object-cover opacity-50 mix-blend-luminosity z-0', className)}
			alt=""
		/>
	);
};
