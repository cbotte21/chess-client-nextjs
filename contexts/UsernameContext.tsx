import React, {useEffect, useState} from "react";
import axios, {AxiosError} from 'axios';
import {AuthContextProps} from "./AuthContext";

interface IUsernameContextProps {
    username: string,

    refresh(_id: string): void,
    search(_id: string): Promise<any>,
    get(): string,
    set(jwt: string, username: string): boolean,
}

export var UsernameContextProps: IUsernameContextProps = {
    username: "",

    refresh: refresh,
    search: search,
    get: get,
    set: set
}

const UsernameContext = React.createContext<IUsernameContextProps>(UsernameContextProps);

export function UsernameProvider({children}: any): any {
    let [authContext] = useState(AuthContextProps)
    const [usernameContext, setUsernameContext] = React.useState(UsernameContextProps)

    useEffect(() => {
        if (authContext.authenticated()) {
            usernameContext.refresh(authContext.id())
        }
    }, [authContext.authenticated()]);

    return (
        <UsernameContext.Provider value={usernameContext}>
            {children}
        </UsernameContext.Provider>
    )
}

function get(): string {
    return UsernameContextProps.username
}

function search(_id: string): Promise<any> {
    return axios.get("/api/username?_id="+_id)
        .then(res => {
            console.log(res)
            return res.data.username
        })
}

function refresh(_id: string): void {
    axios.get("/api/username?_id="+_id)
        .then(res => {
            console.log(res)
            UsernameContextProps.username = res.data.username
        })
        .catch(err => {
            console.log(err)
            UsernameContextProps.username = ""
        })
}

function set(jwt: string, username: string): boolean {
    axios.post("/api/username", {
        jwt: jwt,
        username: username
    })
        .then(res => {
            console.log(res)
            return true
        })
        .catch(err => {
            console.log(err)
            return false
        })
    return false
}