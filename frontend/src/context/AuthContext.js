import React, { useReducer } from 'react'
import { AuthReducer, initialState } from './Reducer'

const AuthStateContext = React.createContext()
const AuthDispatchContext = React.createContext()

export function useAuthState(){
    const context = React.useContext(AuthStateContext)
    if(context === undefined) {
        throw new Error('Musisz zostać uwierzytelniony przez odpowiedni algorytm.')
    }

    return context
}

export function useAuthDispatch() {
    const context = React.useContext(AuthDispatchContext)
    if (context === undefined) {
        throw new Error('Musisz zostać uwierzytelniony przez odpowiedni algorytm.')
    }
    return context
}

export const AuthProvider = ({children}) => {
    const [user, dispatch] = useReducer(AuthReducer, initialState);
    return (
        <AuthStateContext.Provider value={user}>
            <AuthDispatchContext.Provider value={dispatch}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
    )
}