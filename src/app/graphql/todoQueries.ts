import {gql} from "@apollo/client";


export const GET_DATA = gql`
    query Data {
        todos {
            id
            title
            color {
                id
            }
            tasks {
                id
            }
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
            text
            completed
            todo {
                id
            }
        }
    }

`

export const GET_TODOS = gql `
    query Todos {
        todos {
            id
            title
            color {
                id
                red
                green
                blue
                opacity
            }
            tasks{
                id
            }
        }
    }
`

export const GET_COLORS = gql`
    query Colors {
        colors {
            id
            red
            green
            blue
            opacity
        }
    }
`

export const GET_TASKS = gql`
    query Tasks {
        tasks {
            id
            text
            completed
            todo {
                id
            }
        }
    }
`