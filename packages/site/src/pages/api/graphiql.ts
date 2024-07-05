import postgraphileMiddleware from '@/api/postgraphile/postgraphileMiddleware';
import runMiddleware from '@/api/runMiddleware';
import {NextApiRequest, NextApiResponse} from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (process.env.ENABLE_GRAPHIQL !== 'true') {
		res.statusCode = 404;
		res.end();
		return;
	}
	res.statusCode = 200;
	await runMiddleware(req, res, postgraphileMiddleware);
	res.end();
};