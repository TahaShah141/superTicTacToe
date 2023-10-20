import React, { useEffect, useState } from 'react'
import { Board } from './Board'
import { useGameContext } from '../Context/useGameContext'


export const SuperBoard = ({endGame}) => {
  const {boards, actives, winner, dispatch} = useGameContext()
  
  useEffect(() => {
    if (winner !== 0) endGame(winner)
  }, [winner])

  return (
    <>
      <div className='w-max grid grid-cols-3 gap-3'>

      {boards.map((row, y) =>
      <>
        {row.map((col, x) => <Board key={`board${y*3+x}`} board={3*y+x} active={actives[y][x]}/>)}
      </>)}
      </div>
    </>
  )
}
