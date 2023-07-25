import React from "react";
import {useEffect, useState} from "react";

class Position {
    x: number
    y: number
    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
}

export default function Board() {
    // @ts-ignore
    let [board, setBoard] = useState<[Boolean]>([])
    let selection: Position | undefined = undefined

    let interact = (position: Position) => {
        if (selection == undefined) {  // First selection
            // TODO: Show indicator on square
            selection = position
        } else {  // Second selection to move
            // Send request to API
            console.log("Move attempted:\nInitial:",selection?.x, selection?.y,"\nFinal:",position?.x,position?.y)
            selection = undefined
        }
    }

    useEffect(() => {
        // @ts-ignore
        setBoard([])

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

    return (
        <div className="border-solid border-8 border-black w-fit">
            {board?.map((color, i) => {
                let styles = "w-24 h-24"
                if (color) {
                    styles += " bg-black"
                }
                const b = <button className={styles} key={i} onClick={() => interact(new Position((i+1)%8, Math.trunc((i+1)/8)+1))} />
                if ((i+1) % 8 == 0) {  // Include break
                    return <React.Fragment key={i*1000}>
                        {b}
                        <br key={i*10000}/>
                    </React.Fragment>
                }
                return b
            })}
        </div>
    )
}