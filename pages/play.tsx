import {useState} from "react";
import {redirect, RedirectType} from "next/navigation";
import {QueueClient} from "../utils/queueClient";
import {AuthContextProps} from "../contexts/AuthContext";

export default function Play() {
    let [authContext] = useState(AuthContextProps)
    authContext.authorizedEndpoint()

    const originalStatus = <i>Idle</i>

    let startQueue = () => {
        setStatus(<i className="text-green-500">Searching...</i>)
        queueClient.Join(authContext.jwt())
            .catch(err => {
                alert(err)
            })
        setContent(endQueueButton)
    }

    let onGame = () => {
        redirect("/game", RedirectType.push)
    }

    let leaveQueue = () => {
        setStatus(originalStatus)
        queueClient.Leave(authContext.jwt())
        setContent(startQueueButton)
    }

    const style = "bg-gray-300 p-1 my-2"
    const startQueueButton = <button onClick={startQueue} className={style} value="Enter queue" id="start">Enter Queue</button>
    const endQueueButton = <button onClick={leaveQueue} className={style} value="Cancel" id="cancel">Cancel</button>

    let [status, setStatus] = useState<JSX.Element>(originalStatus)
    let [content, setContent] = useState<JSX.Element>(startQueueButton)

    const queueClient = new QueueClient(onGame)

    return (
        <div className="flex-col text-center">
            <div>
                <h3 className='font-bold mt-4'>Status:</h3>{status}
            </div>
            {content}
        </div>
    )
}