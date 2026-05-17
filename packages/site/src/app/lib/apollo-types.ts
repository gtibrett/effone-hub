/**
 * Apollo v4 widened `QueryResult.data` to `TData | DeepPartial<TData> | undefined`
 * to support `@defer` and streaming partial states. This codebase doesn't use
 * `@defer`, so callers want the v3-style `TData | undefined` shape.
 *
 * `SimpleApolloResult<T>` is the prop-type shim used wherever a component
 * receives `{data, loading}` from a parent that called a useSuspenseQuery or
 * useQuery hook — keeps the consumer-side types narrow so existing
 * `data?.foo.bar` chains stay valid.
 */
export type SimpleApolloResult<TData> = {
	data?:   TData;
	loading: boolean;
};
