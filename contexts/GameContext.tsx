import React from "react";
import {Position} from "../components/Position";

let gameState: number[][] = [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0]
]

export enum Flags {
    NULL = -1,
    PAWN = 0,
    KNIGHT = 1,
    ROOK = 2,
    BISHOP = 3,
    QUEEN = 4,
    KING = 5,
    PIECEITER = 5,
    TEAMWHITE = 6,
    ALLITER = 6
}

interface IGameContextProps {
    move(initial: Position, final: Position): boolean,
    state(): number[][],
    flagState(flag: Flags): number[],
    pieceAtPosition(position: Position): Flags,
}

export var GameContextProps: IGameContextProps = {
    move: move,
    state: state,
    flagState: flagState,
    pieceAtPosition: pieceAtPosition
}

const GameContext = React.createContext<IGameContextProps>(GameContextProps);

export function GameProvider({children}: any): any {
    const [gameContext, setAuthContext] = React.useState(GameContextProps)

    return (
        <>
            <GameContext.Provider value={gameContext}>
                {children}
            </GameContext.Provider>
        </>
    )
}

function move(): boolean {
    return false
}

function state(): number[][] {
    return gameState
}

function flagState(flag: Flags): number[] {
    return gameState[flag]
}

function pieceAtPosition(position: Position): Flags {
    for (let i = 0; i < Flags.PIECEITER; i++) {
        for (let k = 0; k < gameState[i].length; k++) {
            let isPiece: boolean = Boolean(gameState[i][k] & position.offset())
            if (isPiece) {
                return i
            }
        }
    }
    return Flags.NULL
}