import {Typography} from '@/components/ui';

import {visuallyHidden} from '@mui/utils';

const OpensInNewWindow = () => <Typography paragraph={false} component="span" sx={visuallyHidden}>(opens in a new window)</Typography>;

export default OpensInNewWindow;