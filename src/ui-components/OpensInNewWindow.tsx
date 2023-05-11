import {Typography} from '@mui/material';
import {visuallyHidden} from '@mui/utils';

export const useHandleLink = () => (url: string) => () => window.open(url);

const OpensInNewWindow = () => <Typography sx={visuallyHidden}>(opens in a new window)</Typography>;

export default OpensInNewWindow;