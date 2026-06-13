import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

import type { PropsWithClassName } from '@/types';

import carbonFiberTexture from './images/carbon-fiber-texture.png';

export const CarbonFiberOverlay = ({ className }: PropsWithClassName) => {
	return (
		<Image
			fill
			sizes="100vw"
			loading="eager"
			src={carbonFiberTexture}
			className={twMerge('object-cover opacity-35 mix-blend-luminosity z-0', className)}
			alt=""
		/>
	);
};
