let user = localStorage.getItem('currentUser')
? JSON.parse(localStorage.getItem('currentUser')).user : "" 

let token = localStorage.getItem('currentUser')
? JSON.parse(localStorage.getItem('currentUser')).auth_token : "" 

export const initialState = {
    user: "" || user,
    token: "" || token,
    loading: false,
    errorMessage: null
}

export const AuthReducer = (initialState,action) => {
    switch(action.type) {
        case "REQUEST_LOGIN":
            return {...initialState, loading:true}
        case "LOGIN_SUCCESS":
            return {...initialState, loading:false, user: action.payload.user, token: action.payload.token}
        case "LOGOUT":
            return {...initialState, user: "", token:""}
        case "LOGIN_ERROR":
            return {...initialState, loading:false, errorMessage: action.error}
        default: 
            throw new Error("Nierozpoznano akcji: ", action.type)
    }
}