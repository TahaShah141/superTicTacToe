import { useState } from 'react'
import './App.css'
import { SuperBoard } from './Components/SuperBoard'
import { GameContextProvider } from './Context/GameContext'

function App() {
  const [winner, setWinner] = useState(0)
  const endGame = (winnerTurn) => {
    setWinner(winnerTurn)
  }
  return (
    <div className={`flex flex-col justify-center h-screen items-center ${winner == 1 ? "bg-blue-400" : winner == -1 ? "bg-red-500" : "bg-neutral-900"} gap-4 sm:gap-8`}>
    <h1 className={` font-mono text-2xl x-sm:text-3xl ${winner == 0 ? "text-white" : "text-black"}`}>{winner == 1 ? "Player 1 Won !!" : winner == -1 ? "Player 2 Won !!" : "Super Tic-Tac-Toe"}</h1>
    <GameContextProvider>
      <SuperBoard endGame={endGame}/>
    </GameContextProvider>
    </div>
  )
}

export default App
