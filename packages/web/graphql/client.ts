import { API_URL } from "@/constants";
import {
  authorizationHeaderWithToken,
  setAccessToken,
} from "@/utils/accessToken";
import { isBrowser } from "@/utils/isBrowser";
import { isEqual } from "@/utils/isEqual";
import { refreshAccessToken } from "@/utils/refreshAccessToken";
import {
  ApolloClient,
  concat,
  fromPromise,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import merge from "deepmerge";
import { useMemo } from "react";

// https://developers.wpengine.com/blog/apollo-client-cache-rehydration-in-next-js
// merge server and client apollo client

export type Client = ApolloClient<NormalizedCacheObject>;
const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

let apolloClient: Client | undefined;

export function createApolloClient() {
  const httpLink = new HttpLink({
    uri: `${API_URL}/graphql`,
    credentials: "include",
  });

  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    if (graphQLErrors?.some(error => error.message === "Unauthorized")) {
      try {
        return fromPromise(
          refreshAccessToken().then(({ accessToken }) => {
            if (accessToken) {
              setAccessToken(accessToken);
              const context = operation.getContext();

              operation.setContext({
                ...context,
                headers: {
                  ...context.headers,
                  authorization: authorizationHeaderWithToken(accessToken),
                },
              });
            }
          }),
        ).flatMap(() => forward(operation));
      } catch (error) {
        // TODO: adicionar toast
        console.log({ error });
      }
    }
  });

  return new ApolloClient({
    ssrMode: !isBrowser(),
    link: concat(errorLink, httpLink),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState?: NormalizedCacheObject) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.cache.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter(d => sourceArray.every(s => !isEqual(d, s))),
      ],
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }

  // For SSG and SSR always create a new Apollo Client
  if (!isBrowser()) {
    return _apolloClient;
  }

  // Create the Apollo Client once in the client
  if (!apolloClient) {
    apolloClient = _apolloClient;
  }

  return _apolloClient;
}

export function addApolloState(client: Client, pageProps: any = { props: {} }) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

export function useApolloClient(pageProps: any) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
}
