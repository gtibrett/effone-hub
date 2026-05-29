import { NextApiRequest, NextApiResponse } from 'next';

import postgraphileMiddleware from '@/api/postgraphile/postgraphileMiddleware';
import runMiddleware from '@/api/runMiddleware';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (process.env.ENABLE_GRAPHIQL !== 'true') {
		res.statusCode = 404;
		res.end();
		return;
	}
	await runMiddleware(req, res, postgraphileMiddleware);
};

export const config = {
	api: {
		bodyParser: false
	}
};
