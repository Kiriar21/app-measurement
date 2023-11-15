export const Reducer = (state, action) => {
    switch (action.type) {
        case 'set-login':
            return {...state, user: action.user }
        case 'set-logout':
            return {...state, user: null}
        default:
            throw new Error('Niestety, ale coś poszło nie tak. Nie ma takiej akcji: ',action.type)
    }
}

export const initialState = {
    user: JSON.parse(window.localStorage.getItem('token-data')) ?? null
}