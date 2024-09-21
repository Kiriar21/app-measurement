export async function loginUser(dispatch, loginPayLoad) {
    try {   
        dispatch({ type: 'REQUEST_LOGIN' })
        let data = {user: loginPayLoad.email, auth_token: loginPayLoad.email}

            dispatch({ type: 'LOGIN_SUCCESS', payload: data});
            localStorage.setItem('currentUser', JSON.stringify(data))
            return data
            
    } catch (err) {
        dispatch({ type: 'LOGIN_ERROR', error:err})
    }
}

export async function logout(dispatch) {
    dispatch({ type: 'LOGOUT' })
    localStorage.removeItem('currentUser')
    localStorage.removeItem('token')
}