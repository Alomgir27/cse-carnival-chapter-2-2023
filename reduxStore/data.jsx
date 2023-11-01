import axios from "axios"

const inititialState = {
    users: [],
}

export default function reducer(state = inititialState, action) {
    switch (action.type) {
        case "SET_USERS":
            return { ...state, users: action.payload }
        default:
            return state
    }
}



