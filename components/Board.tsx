import React, {useEffect, useState} from "react";
import Image from "next/image";
import {GameContextProps, Flags} from "../contexts/GameContext";
import {Position} from "./Position";

export default function Board(props: any): JSX.Element {
    let [gameContext] = useState(GameContextProps)
    let [board, setBoard] = useState<Boolean[]>([])
    let [selectedTile, setSelectedTile] =  useState<number>(-1)
    let selection: Position | undefined = undefined

    let interact = (position: Position) => {
        if (selection == undefined) {  // First selection
            selection = position
            setSelectedTile(selection.value())
        } else {  // Second selection to move
            console.log("Move attempted:\nInitial:",selection.x, selection.y,"\nFinal:",position?.x,position?.y)
            setSelectedTile(-1)
            // TODO: Request move
            selection = undefined
        }
    }

    useEffect(() => {
        // @ts-ignore
        setBoard([])

	    // Draw board
        for (let i = 0; i < 8; i++) {  // row
            for (let k = 0; k < 8; k++) {  // column
                if (i % 2 == 0) {
                    board?.push(Boolean(k % 2))
                } else {
                    board?.push(!Boolean(k % 2))
                }
            }
        }

        setBoard(board)
    }, [false])

    let state = board?.map((color, i) => {
        let position = new Position(i / 8, i % 8)
        let styles = "w-16 h-16 items-center"
        if (color) {
            styles += " bg-black"
        }
        if (i == selectedTile) {
            styles += "border-solid border-red-500 border-4"
        }

        //let piece = gameState.positionState(position)
//        let team = (gameState.pieceState(Flags.TEAMWHITE) & position.offset()) != BigInt(0)

        let team = 1
        let piece = 5

        const b = <button className={styles} key={i} onClick={() => interact(new Position((i+1)%8, 7-Math.trunc((i+1)/8)+1))}>
            <Image src={"/"+team+"_"+piece+".png"} className={"mx-auto"} alt={""} height={50} width={50}/>
        </button>

        if ((i+1) % 8 == 0) {  // Include break
            return <React.Fragment key={i*1000}>
                {b}
                <br key={i*10000}/>
            </React.Fragment>
        }
        return b
    })

    return (
        <div className="border-solid border-8 border-black w-fit">
            {state}
        </div>
    )
}
