import {faWikipediaW} from '@fortawesome/free-brands-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Maybe} from '@gtibrett/effone-hub-graph-api/types';
import {Link} from '@gtibrett/mui-additions';
import {LinkProps, Typography} from '@mui/material';
import {visuallyHidden} from '@mui/utils';

type WikipediaLinkProps = {
	href: Maybe<LinkProps['href']> | undefined;
}

export default function WikipediaLink({href}: WikipediaLinkProps) {
	if (!href) {
		return null;
	}
	
	return (
		<Link href={href} target="_blank">
			<Typography component="span" variant="caption"><FontAwesomeIcon icon={faWikipediaW}/> more on wikipedia</Typography>
			<Typography component="span" sx={visuallyHidden}> (opens in a new window)</Typography>
		</Link>
	);
}