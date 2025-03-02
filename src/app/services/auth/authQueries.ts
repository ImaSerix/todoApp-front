import {gql} from "@apollo/client";


export const LOGIN = gql`
    mutation LoginUser ($email: String!, $password: String!) {
        loginUser (email: $email, password: $password) {
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
    mutation LogoutUser {
        logoutUser
    }
`