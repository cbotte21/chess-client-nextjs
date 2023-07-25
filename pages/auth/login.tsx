import type {NextPage} from 'next'
import Head from 'next/head'
import React, {FormEvent, useEffect, useState} from 'react'

import {AuthContextProps} from "../../contexts/AuthContext";
import Link from "next/link";
import {useRouter} from "next/navigation";

const Login: NextPage = () => {
    let [authContext] = useState(AuthContextProps)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { push } = useRouter();

    const onSubmit = (e: FormEvent) => {
        e.preventDefault() // Prevent the redirect
        authContext.login(email, password)
            .then(success => {
                if (success) {
                    push('/')
                }
            })
    }

    return (
        <>
            <Head>
                <title>Chess | Login</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <div className="w-full max-w-xs">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={onSubmit}>
                    <div className="mb-4 bt-6 text-center w-full">
                        <h1 className="block text-gray-700 text-4xl font-bold mb-2">Login</h1>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email" type="text" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password" type="password" placeholder="******************" onChange={e => setPassword(e.target.value)}/>
                            <p className="text-red-500 text-xs italic">Please choose a password.</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit">
                            Sign In
                        </button>
                        <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                           href="#">
                            Forgot Password?
                        </a>
                    </div>
                </form>
                <p className="text-center text-gray-500 text-xs">
                    Need an account? <Link href="/auth/signup" className="text-blue-700">Signup</Link> <br/>
                    &copy;2023 Cody Botte. All rights reserved.
                </p>
            </div>
        </>
    )
}

export default Login