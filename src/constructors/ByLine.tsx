import {Link} from '@gtibrett/mui-additions';
import {ConstructorId, useConstructor} from './ConstructorProvider';

type ByLineProps = {
	id?: ConstructorId;
	variant?: 'name' | 'link';
}


export default function ByLine({id, variant = 'link'}: ByLineProps) {
	const constructor = useConstructor(id);
	
	if (!constructor) {
		return null;
	}
	
	const {constructorId, name} = constructor;
	
	switch (variant) {
		case 'name':
			return <>{name}</>;
		
		case 'link':
			return (
				<Link to={`/constructor/${constructorId}`}>{name}</Link>
			);
	}
	
	return null;
}