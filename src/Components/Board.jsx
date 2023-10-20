import React, { useState } from 'react'
import { Cell } from './Cell'
import { useGameContext } from '../Context/useGameContext'

export const Board = ({wonBoard, makeActives, active=false}) => {
  const emptyBoard = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ]
  const [board, setBoard] = useState(emptyBoard)
  const [winner, setWinner] = useState(0)
  const {turn} = useGameContext()

  const clickedCell = (x, y) => {
    if (!active || winner != 0) return false 
    //can make move
    board[y][x] = turn
    setBoard(board)
    makeActives(x, y)
    if (checkWin()) {
      setWinner(turn)
      wonBoard()
    }
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
    <div className={`grid grid-cols-3 w-max sm:border-4 x-sm:gap-2 p-2 x-sm:p-3 gap-1 border-2 sm:rounded-xl x-sm:border-1 rounded-lg 
    ${winner == 0 ? "border-black" : "border-white"}
    ${winner == 1 ? "bg-blue-700" : winner == -1 ? "bg-red-700" : active ? "bg-neutral-300" : "bg-neutral-900"}`}>
      {board.map((row, y) =>
      <>
        {row.map((col, x) => <Cell clickedCell={() => clickedCell(x, y)}/>)}
      </>)}
    </div>
  )
}
