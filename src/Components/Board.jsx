import React, { useEffect, useState } from 'react'
import { Cell } from './Cell'
import { useGameContext } from '../Context/useGameContext'

export const Board = ({board, active=false}) => {
  const {superBoard, boards, turn, dispatch} = useGameContext()

  const clickedCell = (x, y) => {
    if (!active || boards[Math.floor(board/3)][board %3] !== 0) return 
    dispatch({type: "MOVE", payload: {board, y, x}})
  }

  const playBoard = (<>
    
    </>)

  return (
    <>
    {<div className={`grid grid-cols-3 w-max sm:border-4 x-sm:gap-2 p-2 x-sm:p-3 gap-1 border-2 sm:rounded-xl x-sm:border-1 rounded-lg border-black */}
    ${boards[Math.floor(board/3)][board %3] === 1 ? "bg-blue-600" : boards[Math.floor(board/3)][board %3] === -1 ? "bg-red-900" : active ? turn == 1 ? "bg-blue-400" : "bg-red-500" : "bg-neutral-900"}`}>
      {superBoard[board].map((row, y) =>
      <>
        {row.map((col, x) => <Cell key={`board${board}-Cell${y*3+x}`} clickedCell={() => clickedCell(x, y)} val={superBoard[board][y][x]} won={boards[Math.floor(board/3)][board %3]}/>)}
      </>)}
    </div>}
    </>
  )
}
