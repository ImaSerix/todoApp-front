import {ApolloClient, createHttpLink, InMemoryCache} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import tokenManager from "../features/authentication/tokenManager.ts";

const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            ...tokenManager.getInstance().getAuthHeader(),
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

export default client;