import {gql} from "@apollo/client";

export const DATA_QUERY = gql`
    query getData {
        todos {
            id
            title
            colorId
            userId
        }
        tasks {
            id
            todoId
            content
            completed
        }
        colors {
            id
            red
            green
            blue
            opacity
        }
    }
`

export const SAVE_UPDATES = gql`
    mutation saveUpdates($state: String!) {
        saveUpdates(state: $state){
            todos {
                id
                title
                colorId
                userId
            }
            tasks {
                id
                todoId
                content
                completed
            }
            colors {
                id
                red
                green
                blue
                opacity
            }
        }
    }
`