import {Link} from '@gtibrett/mui-additions';
import {TeamId, useTeam} from './ConstructorProvider';

type ByLineProps = {
	id?: TeamId;
	variant?: 'name' | 'link';
}


export default function ByLine({id, variant = 'link'}: ByLineProps) {
	const {team} = useTeam(id);
	
	if (!team) {
		return null;
	}
	
	const {constructorRef, name} = team;
	
	switch (variant) {
		case 'name':
			return <>{name}</>;
		
		case 'link':
			return (
				<Link to={`/constructor/${constructorRef}`}>{name}</Link>
			);
	}
	
	return null;
}