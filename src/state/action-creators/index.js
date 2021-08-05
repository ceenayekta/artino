export const depositeMoney = (amount) => {
    return (dispatch) => {
        dispatch({
            type: "DEPOSIT",
            payload: amount
        })
    }
}
export const withdrawMoney = (amount) => {
    return (dispatch) => {
        dispatch({
            type: "WITHDRAW",
            payload: amount
        })
    }
}
export const bankruptMoney = () => {
    return (dispatch) => {
        dispatch({
            type: "BANKRUPT"
        })
    }
}