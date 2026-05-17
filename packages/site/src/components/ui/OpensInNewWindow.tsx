import {Typography} from '@/components/ui';

import {visuallyHidden} from '@/lib/visuallyHidden';

const OpensInNewWindow = () => <Typography paragraph={false} component="span" sx={visuallyHidden}>(opens in a new window)</Typography>;

export default OpensInNewWindow;