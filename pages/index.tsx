import type {NextPage} from 'next'
import Head from 'next/head'
import Link from "next/link";

let exampleButton = "bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"

import {AuthContextProps} from "../contexts/AuthContext";
import React, {useEffect, useState} from "react";

const Home: NextPage = () => {
    let [authContext] = useState(AuthContextProps)

    const [content, setContent] = useState<JSX.Element>(<>
        <h1 className="text-6xl my-10">Welcome to my chess game.</h1>
        <Link href="/auth/login" className={exampleButton+" mx-2"}>
            Login
        </Link>
        <Link href="/auth/signup" className={exampleButton}>
            Signup
        </Link>
    </>)

    useEffect(() => {
        if (authContext.authenticated()) {
            setContent(<h1 className=" ml-4 text-6xl my-10">Welcome back!</h1>)
        }
    }, [authContext.authenticated()])

    return (
        <div>
            <Head>
                <title>Chess app</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            {content}
        </div>
    )
}

export default Home
