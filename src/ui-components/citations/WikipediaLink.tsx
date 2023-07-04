import {faWikipediaW} from '@fortawesome/free-brands-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link} from '@gtibrett/mui-additions';
import {LinkProps, Typography} from '@mui/material';
import {visuallyHidden} from '@mui/utils';


export default function WikipediaLink({href}: Pick<LinkProps, 'href'>) {
	
	return (
		<Link href={href} target="_blank">
			<Typography variant="caption"><FontAwesomeIcon icon={faWikipediaW}/> more on wikipedia</Typography>
			<Typography sx={visuallyHidden}> (opens in a new window)</Typography>
		</Link>
	);
}