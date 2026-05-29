import type { IncomingMessage, ServerResponse } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';

type ConnectMiddleware = (
	req: IncomingMessage,
	res: ServerResponse,
	next: (err?: unknown) => void
) => void;

// Resolve on the `next` callback OR when the response finishes/closes. grafserv
// commonly ends the response itself without calling `next`, which would leave
// the promise pending until the serverless function times out.
export default function runMiddleware(
	req: NextApiRequest,
	res: NextApiResponse,
	fn: ConnectMiddleware
): Promise<unknown> {
	return new Promise((resolve, reject) => {
		let settled = false;
		const done = (result?: unknown) => {
			if (settled) return;
			settled = true;
			if (result instanceof Error) reject(result);
			else resolve(result);
		};
		res.once('finish', () => done());
		res.once('close', () => done());
		fn(req, res, done);
	});
}
