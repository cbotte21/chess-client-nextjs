import React from "react";
import {deleteCookie, getCookie, setCookie} from 'cookies-next';
import axios, {AxiosError} from 'axios';
import querystring from "querystring";
import {redirect} from "next/navigation";

//TODO: login && signup should return a promise of possible Errors

interface IAuthContextProps {
    authorizedEndpoint(): void, // MIGHT NOT WORK
    authenticated(): boolean,

    jwt(): string,

    logout(): void,

    login(email: string, password: string): Promise<boolean>

    signup(email: string, password: string): Promise<boolean>
}

export var AuthContextProps: IAuthContextProps = {
    authorizedEndpoint: authorizedEndpoint,
    authenticated: authenticated,
    jwt: jwt,
    logout: logout,
    login: login,
    signup: signup
}

const AuthContext = React.createContext<IAuthContextProps>(AuthContextProps);

export function AuthProvider({children}: any): any {
    const [authContext, setAuthContext] = React.useState(AuthContextProps)

    return (
        <AuthContext.Provider value={authContext}>
            {children}
        </AuthContext.Provider>
    )
}

function authorizedEndpoint() {
    if (!authenticated()) {
        redirect("/auth/login")
    }
}

async function login(email: string, password: string): Promise<boolean> {
    return axios.post("/api/auth/login",
        querystring.stringify({
            "email": email,
            "password": password,
        }), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        .then(function (res) {
	        setCookie("jwt", res.data.jwt, { sameSite: 'lax' })
            alert(res.status)
            return authenticated() //TODO: Cookie might be expired? Compare res.status too.
        })
        .catch((err: AxiosError) => {
            console.log("AuthContext::login", err)
	        return false
	})
}

async function signup(email: string, password: string): Promise<boolean> {
    return axios.post("/api/auth/signup",
        querystring.stringify({
            "email": email,
            "password": password,
        }), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        .then(function (res) {
            return res.status == 200
        })
        .catch((err: AxiosError) => {
            console.log("AuthContext::signup", err)
            return false
        })
}

function authenticated() {
    return getCookie("jwt") != undefined
}

function logout() {
    deleteCookie("jwt")
}

function jwt(): string {
    let tmp = getCookie("jwt")
    return tmp == undefined ? "" : tmp.toString()
}
