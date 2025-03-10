import {ApolloClient, createHttpLink, InMemoryCache} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import {store} from "../redux/store.ts";

const httpLink = createHttpLink({
    uri: 'http://localhost:3000',
});

const authLink = setContext((_, { headers }) => {
    const accessToken = store.getState().auth.accessToken;

    return {
        headers: {
            ...headers,
            ...(accessToken ? { authorization: `Bearer ${accessToken}` } : {}),
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

export default client;