import React, {useEffect, useState} from "react";
import Image from "next/image";
import {GameContextProps, Flags} from "../contexts/GameContext";
import {Position} from "./Position";

export default function Board(props: any): JSX.Element {
    let [gameContext] = useState(GameContextProps)
    let [selectedTile, setSelectedTile] =  useState<Position | undefined>(undefined)
    let [board, setBoard] = useState<JSX.Element[]>([])

    let interact = (position: Position) => {
        if (selectedTile == undefined) {  // First selection
            setSelectedTile(position)
        } else {  // Second selection to move
            console.log("Move attempted:\nInitial:",selectedTile.x, selectedTile.y,"\nFinal:",position?.x,position?.y)
            setSelectedTile(undefined)
            // TODO: Request move
        }
    }

    useEffect(() => {
        let res: JSX.Element[] = []
        for (let i = 0; i < 8; i++) {  // row
            for (let k = 0; k < 8; k++) {  // column
                let position = new Position(8-i, k+1)
                let styles = "w-16 h-16 items-center"

                if (i % 2 == 0) {
                    if (k % 2) {
                        styles += " bg-green-900"
                    }
                } else {
                    if (!(k % 2)) {
                        styles += " bg-green-900"
                    }
                }

                if (position.equals(selectedTile != undefined ? selectedTile : new Position(-1, -1))) {
                    styles += " border-solid border-red-500 border-4"
                }

                let piece = gameContext.pieceAtPosition(position)
                let team = 0
                gameContext.flagState(Flags.TEAMWHITE).forEach(state => {
                    if (state & position.offset()) {
                        team = 1
                    }
                })

                let pieceImage = piece == Flags.NULL ? <></> : <Image src={"/"+team+"_"+piece+".png"} className={"mx-auto"} alt={""} height={50} width={50}/>

                res.push(<button className={styles} key={i*8+k} onClick={() => interact(position)}>
                    {pieceImage}
                </button>)

                if (k == 7) {  // Include break
                    res.push(<br key={(i*8+k)*10000}/>)
                }
            }
        }
        setBoard(res)
    }, [selectedTile]);

    return (
        <div className="border-solid border-8 border-black w-fit">
            {board}
        </div>
    )
}
