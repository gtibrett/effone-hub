import type { Metadata } from 'next';

import ConstructorsContent from './ConstructorsContent';

export const metadata: Metadata = {
	title: 'Constructors | effOne Hub'
};

export default function ConstructorsPage() {
	return <ConstructorsContent />;
}
