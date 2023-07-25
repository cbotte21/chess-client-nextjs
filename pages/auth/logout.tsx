import type { NextPage } from 'next'
import React, {useEffect, useState} from 'react'
import {useRouter} from "next/navigation"

import { AuthContextProps } from "../../contexts/AuthContext";

const Logout: NextPage = () => {
    const { push } = useRouter();
    let [authContext, setAuthcontext] = useState(AuthContextProps)
    authContext.logout()
    useEffect(() => {
        push('/');
    }, []);
    return <p></p>;
}

export default Logout