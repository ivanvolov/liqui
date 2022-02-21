const initialState = {
    token: 0
}

export const mintReducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        case "SET_TOKEN":
            return {
                ...state,
                token: action.token
            }
        default:
            return state
    }
}
