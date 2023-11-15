import {useState} from "react";

import Board from '../components/Board'
import MoveHistory from '../components/MoveHistory'
import {GameProvider} from "../contexts/GameContext";
import {AuthContextProps} from "../contexts/AuthContext";

export default function Play() {
    let [authContext] = useState(AuthContextProps)
    authContext.authorizedEndpoint()

    return (
        <div className="w-full flex justify-center py-10">
            <GameProvider>
                <Board />
                <MoveHistory />
            </GameProvider>
        </div>
    )
}