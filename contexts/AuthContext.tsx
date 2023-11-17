import React from "react";
import {deleteCookie, getCookie, setCookie} from 'cookies-next';
import axios, {AxiosError} from 'axios';
import querystring from "querystring";
import {redirect} from "next/navigation";

//TODO: login && signup should return a promise of possible Errors

interface IAuthContextProps {
    _id: string | undefined,
    _jwt: string | undefined,

    authenticated(): boolean,

    jwt(): string | undefined,
    id(): string | undefined,

    // Public methods
    authorizedEndpoint(): void,
    logout(): void,
    login(email: string, password: string): Promise<boolean>
    signup(email: string, password: string): Promise<boolean>
}

export var AuthContextProps: IAuthContextProps = {
    _id: undefined,
    _jwt: undefined,

    authorizedEndpoint: authorizedEndpoint,
    authenticated: authenticated,
    jwt: jwt,
    id: id,
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
            return true
        })
        .catch((err: AxiosError) => {
            console.log("AuthContext::login", err)
            logout()
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

function authenticated(): boolean {
    return jwt() != undefined && id() != undefined
}

function logout() {
    deleteCookie("jwt")
    AuthContextProps._id = ""
    AuthContextProps._jwt = ""
}

function authorizedEndpoint() {
    if (!authenticated()) {
        const cookie = getCookie("jwt")
        if (cookie != undefined) {
            // Load cookie data
            // Recursive call
        }
        redirect("/auth/login")
    }
    // Return if token is expired
}

function jwt(): string | undefined {
    return AuthContextProps._id
}

function id(): string | undefined {
    return AuthContextProps._id
}