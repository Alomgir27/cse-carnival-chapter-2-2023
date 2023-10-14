const inititialState = {
    data: new Date()
}

const dateReducer = (state = inititialState, action) => {
    switch (action.type) {
        case 'UPDATE_DATE':
            return {
                ...state,
                data: action.payload
            }
        default:
            return state
    }
}

export default dateReducer
