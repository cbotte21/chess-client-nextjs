import {Flags} from "./GameState";
import Image from "next/image";
import React from "react";

export default function PieceFactory(piece: Flags | undefined): JSX.Element {
    switch(piece) {
        case Flags.PAWN:
            return <Image src={""} alt={"K"}/>
        case Flags.KNIGHT:
            return <Image src={""} alt={"K"}/>
        case Flags.ROOK:
            return <Image src={""} alt={"K"}/>
        case Flags.BISHOP:
            return <Image src={""} alt={"K"}/>
        case Flags.QUEEN:
            return <Image src={""} alt={"K"}/>
        case Flags.KING:
            return <Image src={""} alt={"K"}/>
        default:
            return <React.Fragment/>
    }
}