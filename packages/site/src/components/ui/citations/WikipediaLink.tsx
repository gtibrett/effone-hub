import { faWikipediaW } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, type LinkProps, Typography } from '@mui/material';

import type { Maybe } from '@/gql/graphql';

type WikipediaLinkProps = {
	href: Maybe<LinkProps['href']> | undefined;
};

export default function WikipediaLink({ href }: WikipediaLinkProps) {
	if (!href) {
		return null;
	}

	return (
		<Link href={href} target="_blank">
			<Typography component="span" variant="caption">
				<FontAwesomeIcon icon={faWikipediaW} /> more on wikipedia
			</Typography>
			<Typography component="span" className="sr-only">
				{' '}
				(opens in a new window)
			</Typography>
		</Link>
	);
}
