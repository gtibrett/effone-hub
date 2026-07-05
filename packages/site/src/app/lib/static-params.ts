/**
 * Preview deployments skip prerendering entirely: every page-level
 * `generateStaticParams` routes through this gate. A full prerender fans out
 * ~500 GraphQL queries against Neon, and preview builds outnumber production
 * deploys — pages that are never even opened dominated data-transfer/compute
 * usage. Skipped routes render on-demand (fallback shell + dynamicParams) with
 * cacheLife('max') on first view.
 *
 * The export must be ABSENT on preview (`undefined`), not return `[]`: with
 * cacheComponents/PPR enabled, an empty generateStaticParams result is a
 * build error (EmptyGenerateStaticParamsError).
 */
export function previewSafeStaticParams<TParams>(
	fn: () => Promise<TParams[]>
): (() => Promise<TParams[]>) | undefined {
	return process.env.VERCEL_ENV === 'preview' ? undefined : fn;
}
