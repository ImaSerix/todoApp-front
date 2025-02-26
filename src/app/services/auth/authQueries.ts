import {gql} from "@apollo/client";


export const LOGIN = gql`
    mutation Login ($email: String!, $password: String!) {
        login (email: $email, password: $password) {
            accessToken
            csrfToken
            user {
                username
                email
            }
        }
    }
`

export const LOGOUT = gql`
    mutation Logout {
        logout
    }
`