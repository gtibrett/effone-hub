import type { IncomingMessage, ServerResponse } from 'http';
import { postgraphile } from 'postgraphile';
import { grafserv } from 'postgraphile/grafserv/node';

import preset from '../../../graphile.config';

// PostGraphile v5: build the GraphQL instance once and reuse. `serv.createHandler()`
// returns a connect-style middleware `(req, res, next?) => void` callable from a
// Next.js Pages Router API route.
//
// Pinned to globalThis: Next dev (webpack HMR) re-evaluates server modules across
// recompiles, so a module-scoped instance rebuilds the heavy f1db schema each time
// and accumulates → OOM (SIGKILL 137). Same fix as server-graphql.ts; one schema +
// one grafserv handler per process.
type Handler = (req: IncomingMessage, res: ServerResponse, next?: (err?: Error) => void) => void;
const GLOBAL_KEY = Symbol.for('effone.pgMiddleware');
type GlobalCache = { handler?: Handler };
const globalCache: GlobalCache = ((globalThis as any)[GLOBAL_KEY] ??= {});

function getHandler(): Handler {
	globalCache.handler ??= postgraphile(preset).createServ(grafserv).createHandler() as Handler;
	return globalCache.handler;
}

export default function postgraphileMiddleware(
	req: IncomingMessage,
	res: ServerResponse,
	next?: (err?: Error) => void
): void {
	getHandler()(req, res, next);
}
