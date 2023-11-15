// const url = ""
export async function loginUser(dispatch, loginPayLoad) {
    // const requestOptions = {
    //     method: 'POST',
    //     header: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(loginPayLoad)
    // }

    try {   
        dispatch({ type: 'REQUEST_LOGIN' })
        // let response = await fetch(`${url}/login`, requestOptions);
        // let data = await response.json()

        let data = {user: loginPayLoad.email, auth_token: loginPayLoad.email}

        // if (data.user) {
            dispatch({ type: 'LOGIN_SUCCESS', payload: data});
            localStorage.setItem('currentUser', JSON.stringify(data))
            return data
        // }

        // dispatch({ type: 'LOGIN_ERROR', error: data.errors[0] })
        // return
    } catch (err) {
        dispatch({ type: 'LOGIN_ERROR', error:err})
    }
}

export async function logout(dispatch) {
    dispatch({ type: 'LOGOUT' })
    localStorage.removeItem('currentUser')
    localStorage.removeItem('token')
}