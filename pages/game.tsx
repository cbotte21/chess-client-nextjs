import Board from '../components/Board'
import MoveHistory from '../components/MoveHistory'

export default function Play() {
    return (
        <div className="w-full flex justify-center pt-10">
            <Board />
            <MoveHistory />
        </div>
    )
}