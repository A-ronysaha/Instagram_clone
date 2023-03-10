export const initialState = null
export const Userreducer = (state,action)=>{
    switch (action.type) {
        case "USER" :
            return action.payload
        case "CLEAR" :
            return null
        case "UPDATE" :
            return {
                ...state,
                followers: action.payload.followers,
                following: action.payload.following
            }
        default:
            return state
    }
}