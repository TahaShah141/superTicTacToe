import { createContext, useEffect, useReducer } from "react";

export const GameContext = createContext()

export const gameReducer = (state, action) => {
    switch (action.type) {
        case 'MOVE':
            let newActives = [
                [false, false, false],
                [false, false, false],
                [false, false, false]
            ]
            state.superBoard[action.payload.board][action.payload.y][action.payload.x] = state.turn //add cell
            console.log(state.turn)
            if (checkWin(state.superBoard[action.payload.board], state.turn)) { //check if board won
                state.boards[Math.floor(action.payload.board / 3)][action.payload.board % 3] = state.turn //win board
                if (checkWin(state.boards, state.turn)) { //check if game won
                    state.winner = state.turn //declare winner
                    state.actives = [[false, false, false], [false, false, false], [false, false, false]] //win game
                }
            }
            if (state.boards[action.payload.y][action.payload.x]) {
                for (let row = 0; row < 3; row++) {
                    for (let col = 0; col < 3; col++) {
                        newActives[row][col] = state.boards[row][col] == 0
                    }
                }
            }
            else {
                newActives[action.payload.y][action.payload.x] = true;
            }
            return {...state, superBoard: state.superBoard, boards: state.boards, actives: newActives, winner: state.winner, turn: state.turn*-1}
        default:
            return state
    }
}

export const GameContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(gameReducer, {
        turn: 1,
        superBoard: [
            [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ],
            [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ],
            [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ],
            [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ],
            [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ],
            [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ],
            [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ],
            [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ],
            [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ],
        ],
        boards: [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ],
        actives: [
            [true, true, true],
            [true, true, true],
            [true, true, true]
        ],
        winner: 0
    })

    console.log(state)
    return (
        <GameContext.Provider value={{ ...state, dispatch }}>
            { children }
        </GameContext.Provider>
    )
}

const checkWin = (board, turn) => {
    for (let row = 0; row < 3; row++) {
      let found = true
      for (let i = 0; i < 3; i++) {
        if (board[row][i] !== turn) found = false
      }
      if (found) return true
    }

    for (let col = 0; col < 3; col++) {
      let found = true
      for (let i = 0; i < 3; i++) {
        if (board[i][col] !== turn) found = false
      }
      if (found) return true
    }

    let found = true
    for (let offset = 0; offset < 3; offset++) {
      if (board[offset][offset] !== turn) found = false
    }
    if (found) return true

    found = true
    for (let offset = 0; offset < 3; offset++) {
      if (board[2-offset][offset] !== turn) found = false
    }
    if (found) return true

    let count = 0
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] === turn) count++
      }
    }
    return (count >= 5) 
}