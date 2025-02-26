import {gql} from "@apollo/client";

//todo Убрать userId при релиз билде
export const GET_DATA = gql`
    query GetDataQuery {
        todos {
            id
            title
            colorId
            userId
            taskIds
        }
        colors {
            id
            red
            green
            blue
            opacity
        }
        tasks {
            id
            content
            completed
            todoId
        }
    }
`

export const SAVE_UPDATES = gql`
    mutation SaveUpdates($state: String!) {
        saveUpdates(state: $state)
    }
`