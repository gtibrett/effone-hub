import {Link} from '@gtibrett/mui-additions';
import {TeamId, useTeam} from './useTeam';

type ByLineProps = {
	id?: TeamId;
	variant?: 'name' | 'link';
}


export default function ConstructorByLine({id, variant = 'link'}: ByLineProps) {
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
				<Link href={`/constructor/${constructorRef}`}>{name}</Link>
			);
	}
	
	return null;
}