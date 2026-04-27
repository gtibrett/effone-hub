import postgraphileMiddleware from '@/api/postgraphile/postgraphileMiddleware';
import runMiddleware from '@/api/runMiddleware';
import {NextApiRequest, NextApiResponse} from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	await runMiddleware(req, res, postgraphileMiddleware);
};

export const config = {
	api: {
		bodyParser: false
	}
};
