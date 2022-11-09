import io from "socket.io-client";
import { AUTH_SERVER, POST_SERVER } from "../../scripts/ip";
import components from "../../styles/LoginPage.module.css";
import { useState } from "react";
import Router from 'next/router'
import Head from "next/head";
import authenticationPopup from "gruzauth";
import Image from "next/image";

const socket = io(POST_SERVER);

type NavigateState = {
    go: boolean;
    where: string;
}

function getLeft(main: DOMRect) {
    return Math.floor(Math.random() * (main.width - 100));
}

function getTop(main: DOMRect) {
    return Math.floor(Math.random() * (main.height - 100));
}

function moveBox(event: any) {
    const sec = document.querySelector("#sec")?.getBoundingClientRect();
    const main = document.querySelector("#main")?.getBoundingClientRect();
    
    if (!main || !sec) return;

    let gotTop = getTop(main);
    let gotLeft = getLeft(main);
    while (
        gotTop > sec.y - 100 &&
        gotTop < sec.y + sec.height &&
        gotLeft > sec.x - 100 &&
        gotLeft < sec.x + sec.width
    ) {
        gotTop = getTop(main);
        gotLeft = getLeft(main);
    }
    event.target.style.top = `${gotTop}px`;
    event.target.style.left = `${gotLeft}px`;
}

const showPopup = () => {
    const result = authenticationPopup(AUTH_SERVER, socket.id);
    if (result.trigger) {
        result.trigger();
    }
};

const LoginPage = () => {
    const [navigate, setNavigate] = useState({ go: false, where: "/" } as NavigateState)

    socket.on("auth", (data) => {
        document.cookie = `G_DASH=${data.token}`;
        let redirect: any;
        if (typeof window !== "undefined") {
            const url = new URL(window.location.href);
            redirect = url.searchParams.get("redirect");
        }
        setNavigate({ go: true, where: redirect ? redirect : "/" });
    });

    if (navigate.go) {
        Router.push(navigate.where);
    }

    return(
        <>
            <Head>
                <title>Login</title>
                <meta name="description" content="Login to the dashboard." />
                <link rel="icon" href="/dashboard.png" />
            </Head>
            <main id="main" className={components.main}>
                <div className={components.box} style={{top:"20%",left:"20%"}} onMouseOver={moveBox} onFocus={moveBox}>
                    <div className={components.actual} />
                </div>
                <div className={components.box} style={{top:"80%",left:"80%"}} onMouseOver={moveBox} onFocus={moveBox}>
                    <div className={components.actual} />
                </div>
                <div className={components.secCover}>
                    <div id="sec" className={components.sec}>
                        <h1 className={components.h1}>Dashboard</h1>
                        <button id="sauth-login" className={components.button} onClick={showPopup}>
                            Login with Gruzservices <span>
                                <Image src="https://auth.gruzservices.com/lock2.svg" alt="Lock"/>
                            </span>
                        </button>
                    </div>
                </div>
            </main>
        </>
    );
}

export default LoginPage;