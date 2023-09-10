import React from "react";
import {Position} from "../components/Position";

let gameState: bigint[] = []

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
    state(): bigint[],
    flagState(flag: Flags): bigint,
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

function state(): bigint[] {
    return gameState
}

function flagState(flag: Flags): bigint {
    return gameState[flag]
}

function pieceAtPosition(position: Position): Flags {
    for (let i = 0; i < Flags.PIECEITER; i++) {
        let isPiece: bigint = gameState[i] & position.offset()
        if (isPiece != BigInt(0)) {
            return i
        }
    }
    return Flags.NULL
}