import type {Metadata} from 'next';
import CircuitsContent from './CircuitsContent';

export const metadata: Metadata = {
	title: 'Circuits | effOne Hub'
};

export default function CircuitsPage() {
	return <CircuitsContent/>;
}
