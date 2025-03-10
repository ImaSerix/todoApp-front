import {gql} from "@apollo/client";


export const LOGIN_MUTATION = gql`
    mutation LoginUser ($email: String!, $password: String!) {
        loginUser (email: $email, password: $password) {
            accessToken
            user {
                username
                email
            }
        }
    }
`

export const REGISTER_MUTATION = gql`
    mutation RegisterUser ($email: String!, $username: String! ,$password: String!) {
        registerUser(email: $email, username: $username, password: $password) {
            accessToken
            user {
                username
                password
            }
        }
    }
`

export const RENEW_TOKEN_MUTATION = gql`
    mutation RenewAccessToken {
        renewAccessToken{
            accessToken
            user{
                username
                password
            }
        }
    }
`

export const LOGOUT_MUTATION = gql`
    mutation LogoutUser {
        logoutUser
    }
`