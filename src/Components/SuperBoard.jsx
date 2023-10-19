import React, { useState } from 'react'
import { Board } from './Board'
import { useGameContext } from '../Context/useGameContext'


export const SuperBoard = ({endGame}) => {

  const emptyBoard = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ]

  const defaultActives = [
    [true, true, true],
    [true, true, true],
    [true, true, true]
  ]

  const [board, setBoard] = useState(emptyBoard)
  const [actives, setActives] = useState(defaultActives)
  const {turn} = useGameContext()

  const makeActives = (x, y) => {
    console.log(x, y);
    const won = board[y][x] != 0
    const newActives = [
      [false, false, false],
      [false, false, false],
      [false, false, false]
    ]

    if (won) {
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          newActives[row][col] = board[row][col] == 0
        }
      }
    }
    else {
      newActives[y][x] = true;
    }
    setActives(newActives)
  }

  const wonBoard = (x, y) => {
    board[y][x] = turn
    if (checkWin()) {
      endGame(turn)
      setActives([
        [false, false, false],
        [false, false, false],
        [false, false, false]
      ])
    }
    setBoard(board)
    return true
  }

  const checkWin = () => {
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
  
  return (
      <div className='w-max grid grid-cols-3 gap-3'>

      {board.map((row, y) =>
      <>
        {row.map((col, x) => <Board wonBoard={() => wonBoard(x, y)} makeActives={makeActives} active={actives[y][x]}/>)}
      </>)}
      </div>
  )
}
