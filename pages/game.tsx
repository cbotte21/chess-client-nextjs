import {useState} from "react";

import Board from '../components/Board'
import MoveHistory from '../components/MoveHistory'
import {GameProvider} from "../contexts/GameContext";

export default function Play() {
    return (
        <div className="w-full flex justify-center py-10">
            <GameProvider>
                <Board />
                <MoveHistory />
            </GameProvider>
        </div>
    )
}