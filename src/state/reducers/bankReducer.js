const initialState = 0
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "DEPOSIT":
            return state + action.payload  
            
        case "WITHDRAW":
            return state - action.payload  

        case "BANKRUPT":
            return state - state 

        default:
            return state
    }
}

export default reducer