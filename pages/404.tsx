import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import components from "../styles/PageNotFound.module.css";

export default function Custom404() {
    const [ path, setPath ] = useState("N/A");

    useEffect(() => {
        setPath(window.location.pathname);
    },[]);

    return(
        <>
            <Head>
                <title>Page Not Found</title>
                <link rel="icon" href="/dashboard.png" />
            </Head>
            <div className={components.page}>
                <h1>404 - Page Not Found</h1>
                <h1>{path} does not exist.</h1>
                <Link href="/" passHref><a rel="noopener">Go Home</a></Link>
            </div>
        </>
    );
}