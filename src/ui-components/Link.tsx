import {Link as MuiLink, LinkProps as MuiLinkProps, useTheme} from '@mui/material';
import {FC} from 'react';
import {Link as RouterLink, LinkProps} from 'react-router-dom';

type SmartLinkProps = Omit<MuiLinkProps, 'component'> & Omit<LinkProps, 'to'> & {
	to?: LinkProps['to']
};

const Link: FC<SmartLinkProps> = ({sx = {}, to, color = 'secondary', ...props}) => {
	const theme          = useTheme();
	const selectectColor = (() => {
		switch (color) {
			case 'primary':
				return theme.palette.primary;
			case 'secondary':
				return theme.palette.secondary;
			case 'inherit':
			default:
				return undefined;
		}
	})();
	
	const a11ySx = {
		...sx,
		...(selectectColor ? ({
			px:                 .25,
			'&:hover, &:focus': {
				background: selectectColor.main,
				color:      theme.palette.background.paper
			}
		}) : {})
	};
	
	if (to) {
		return <MuiLink component={RouterLink} color={color} to={to} {...props} sx={a11ySx}/>;
	} else {
		return <MuiLink color={color} {...props} sx={a11ySx}/>;
	}
	
	
};

export default Link;