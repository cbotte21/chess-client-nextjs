import {FormEvent, useState} from "react";
import {AuthContextProps} from "../contexts/AuthContext";

export default function Play() {
    const originalStatus = <i>Idle</i>

    let startQueue =() => {
        setStatus(<i className="text-green-500">Searching...</i>)
        setContent(endQueueButton)
    }

    let endQueue =() => {
        setStatus(originalStatus)
        setContent(startQueueButton)
    }

    const style = "bg-gray-300 p-1 my-2"
    const startQueueButton = <button onClick={startQueue} className={style} value="Enter queue" id="start">Enter Queue</button>
    const endQueueButton = <button onClick={endQueue} className={style} value="Cancel" id="cancel">Cancel</button>

    let [status, setStatus] = useState<JSX.Element>(originalStatus)
    let [content, setContent] = useState<JSX.Element>(startQueueButton)

    return (
        <div className="flex-col text-center">
            <div>
                <h3 className='font-bold mt-4'>Status:</h3>{status}
            </div>
            {content}
        </div>
    )
}