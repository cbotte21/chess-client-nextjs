import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { AuthProvider } from '../contexts/AuthContext'

import Navbar from '../components/Navbar';
import {HiveProvider} from "../contexts/HiveContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
        <HiveProvider>
            <Navbar/>
            <Component {...pageProps} />
        </HiveProvider>
    </AuthProvider>
  );
}

export default MyApp
