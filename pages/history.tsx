import {useState} from "react";
import {AuthContextProps} from "../contexts/AuthContext";


export default function History() {
    let [authContext] = useState(AuthContextProps)
    authContext.authorizedEndpoint()


    return <></>
}