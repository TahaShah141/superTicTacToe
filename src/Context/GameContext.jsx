import { createContext, useEffect, useReducer } from "react";

export const GameContext = createContext()

export const gameReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_TURN':
            return {...state, turn: state.turn * -1}
        default:
            return state
    }
}

export const GameContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(gameReducer, {
        turn: 1
    })

    // useEffect(() => {
    //     dispatch({type: 'LOGIN', payload: JSON.parse(localStorage.getItem('user'))})
    // }, [])

    return (
        <GameContext.Provider value={{ ...state, dispatch }}>
            { children }
        </GameContext.Provider>
    )
}
