import postgraphileMiddleware from '@/api/postgraphile/postgraphileMiddleware';
import runMiddleware from '@/api/runMiddleware';
import { NextApiRequest, NextApiResponse } from "next";

// Endpoint needed for graphiql
export default async (req: NextApiRequest, res: NextApiResponse) => {
	res.statusCode = 200;
	await runMiddleware(req, res, postgraphileMiddleware);
	res.end();
};

export const config = {
	api: {
		bodyParser: false,
	},
}