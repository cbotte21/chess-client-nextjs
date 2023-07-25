import type {NextPage} from 'next'
import Head from 'next/head'
import React, {useEffect, useState} from "react";
import {AuthContextProps} from "../../contexts/AuthContext";
import Link from "next/link";

const valueStyle = "bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"

const Account: NextPage = () => {
    let [authContext, setAuthcontext] = useState(AuthContextProps)
    let [jwt, setJwt] = React.useState("");
    let [email, setEmail] = React.useState("example@example.com");
    useEffect(() => {
        setJwt(authContext.jwt)
    }, [jwt]);
    return (
        <div>
            <Head>
                <title>Chat app | Account</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <h1 className="text-4xl">Account Debug Information</h1> <br/>
            <p>Click <Link href="/auth/logout" className="text-blue-700">HERE</Link> to logout.</p> <br/>

            <table className="table-auto">
                <thead>
                <tr>
                    <th>Field</th>
                    <th>Value</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="w-28 text-center">JWT</td>
                    <td><input
                        className={valueStyle}
                        onChange={() => setJwt(authContext.jwt)}
                        type="text" value={jwt}/></td>
                </tr>
                <tr>
                    <td className="text-center">Email</td>
                    <td><input
                        className={valueStyle}
                        onChange={() => setEmail("example@example.com")}
                        type="text" value={email}/></td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Account