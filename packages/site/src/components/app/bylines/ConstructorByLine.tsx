import { ReactNode } from 'react';
import { Link, Skeleton } from '@mui/material';

import { Team } from '@/gql/graphql';
import { useTeam } from '@/hooks/data';
import { TeamId } from '@/types';

type BaseByLineProps = {
	variant?: 'name' | 'link';
	placeholder?: boolean;
};

type ByLinePropsById = BaseByLineProps & {
	id?: TeamId;
};

type ByLinePropsByTeam = BaseByLineProps & {
	team?: Pick<Team, 'id' | 'name' | 'colors'>;
};

export function isByTeam(props: ByLinePropsById | ByLinePropsByTeam): props is ByLinePropsByTeam {
	return typeof (props as ByLinePropsById).id === 'undefined';
}

const ById = ({ id, ...props }: ByLinePropsById) => {
	const { team } = useTeam(id);

	return <ByTeam {...props} team={team} />;
};

const ByTeam = ({ variant = 'link', placeholder = false, team }: ByLinePropsByTeam) => {
	if (!team) {
		if (placeholder) {
			return <Skeleton variant="text" />;
		} else {
			return null;
		}
	}

	const { id, name } = team;

	switch (variant) {
		case 'name':
			return <>{name}</>;

		case 'link':
			return <Link href={`/constructors/${id}`}>{name}</Link>;
	}

	return null;
};

export default function ConstructorByLine(props: ByLinePropsById): ReactNode;
export default function ConstructorByLine(props: ByLinePropsByTeam): ReactNode;

export default function ConstructorByLine(props: ByLinePropsById | ByLinePropsByTeam) {
	return isByTeam(props) ? <ByTeam {...props} /> : <ById {...props} />;
}
