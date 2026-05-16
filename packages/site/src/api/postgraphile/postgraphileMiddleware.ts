import type {IncomingMessage, ServerResponse} from 'http';
import {postgraphile} from 'postgraphile';
import {grafserv} from 'postgraphile/grafserv/node';
import preset from '../../../graphile.config';

// PostGraphile v5: build the GraphQL instance once at module load and reuse.
// The `serv.createHandler()` returns a connect-style middleware
// `(req, res, next?) => void` that we can call directly from a Next.js
// Pages Router API route.
const pgl  = postgraphile(preset);
const serv = pgl.createServ(grafserv);

const handler = serv.createHandler();

export default function postgraphileMiddleware(req: IncomingMessage, res: ServerResponse, next?: (err?: Error) => void): void {
	handler(req, res, next);
}
