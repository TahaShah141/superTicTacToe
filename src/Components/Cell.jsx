import React, { useState } from 'react'
import { useGameContext } from '../Context/useGameContext'

export const Cell = ({clickedCell}) => {
    const {turn, dispatch} = useGameContext()
    const [val, setVal] = useState(0)
    const clickCell = () => {
      if (!clickedCell()) return
      if (val != 0) return
      setVal(turn)
      dispatch({type: "CHANGE_TURN"})
    }

  return (
    <div className={`w-6 h-6 rounded x-sm:w-8 x-sm:h-8 sm:w-10 sm:h-10 sm:rounded-lg x-sm:rounded-md flex justify-center items-center border-2 x-sm:border-4 border-neutral-950  text-white
    ${val == 1 ? "bg-blue-500" : val == -1 ? "bg-red-600" : "bg-neutral-950"}
    ${val == 1 ? "hover:bg-blue-400" : val == -1 ? "hover:bg-red-500" : "hover:bg-neutral-300"}`}
    onClick={clickCell}>
    </div>
  )
}
