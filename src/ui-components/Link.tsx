import {Link as MuiLink, LinkProps as MuiLinkProps} from '@mui/material';
import {FC} from 'react';
import {Link as RouterLink, LinkProps} from 'react-router-dom';

const Link: FC<Omit<MuiLinkProps, 'component'> & LinkProps> = (props) => {
	return <MuiLink component={RouterLink} color="secondary" {...props} />;
};

export default Link;