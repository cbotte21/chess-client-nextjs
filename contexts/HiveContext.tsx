import React, {useEffect, useState} from "react";
import {AuthContextProps} from "./AuthContext";
import {HiveClient} from "../utils/hiveClient";
import {redirect, RedirectType} from "next/navigation";

export var HiveContextProps = {

}

const HiveContext = React.createContext(HiveContextProps);

export function HiveProvider({children}: any) {
    let [authContext] = useState(AuthContextProps)
    const [hiveContext, setHiveContext] = React.useState(HiveContextProps)
    const hiveClient = new HiveClient()

    useEffect(() => {
        if (authContext.authenticated()) {
            hiveClient.Connect(authContext.jwt())
                .catch(err => {
                    alert(err)
                    authContext.logout()
                    redirect("/auth/login", RedirectType.push)
                })
        } else {
            hiveClient.Disconnect(authContext.jwt())
        }
    }, [authContext.authenticated()]);

    return (
        <HiveContext.Provider value={hiveContext}>
                {children}
        </HiveContext.Provider>
    )
}