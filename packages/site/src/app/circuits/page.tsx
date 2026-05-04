import type {Metadata} from 'next';
import CircuitsContent from './CircuitsContent';

export const metadata: Metadata = {
	title: 'Circuits | effOne Hub'
};

export const revalidate = 3600;

export default function CircuitsPage() {
	return <CircuitsContent/>;
}
