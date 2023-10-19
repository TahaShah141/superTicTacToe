import { useContext } from "react"
import { GameContext } from "./GameContext"

export const useGameContext = () => {
    const context = useContext(GameContext)

    if (!context) {
        throw Error("GameContext used outside provider")
    }

    return context
}