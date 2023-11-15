import React from 'react'

const AuthContext = React.createContext({
    isAuth : false,
    login: () => {},
    logout: () => {}
})

AuthContext.displayName = 'Auth Context'
export default AuthContext