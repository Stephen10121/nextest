import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import Loading from '../components/loading/Loading';
import Router from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("light");

  function setTheme(theme: string) {
    setCurrentTheme(theme);
    window.localStorage.setItem("theme", theme);
  }

  useEffect(() => {
    const theme = window.localStorage.getItem("theme");
    if (!theme || theme==="light") {
      setCurrentTheme("light");
    } else {
      setCurrentTheme("dark");
    }

    const start = () => {
      setLoading(true);
    };

    const end = () => {
      setLoading(false);
    };

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);

    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <>
      <Loading />
      <style global jsx>{`
      :root {
        --header-background-color: ${currentTheme==="light" ? "#f3f3f3" : "#212121"};
        --header-text-color: ${currentTheme==="light" ? "#000" : "#afafaf"};
        --header-border-color: ${currentTheme==="light" ? "#000" : "#afafaf"};
        --logout-background-color: ${currentTheme==="light" ? "#cecece" : "white"};
        --logout-text-color: #000;
        --hamburger-invert: ${currentTheme==="light" ? "0" : "0.7"};
        --main-background-color: ${currentTheme==="light" ? "#fff" : "#000"};
        --main-text-color: ${currentTheme==="light" ? "#000" : "#fff"};
        --main-fancy-text-color: ${currentTheme==="light" ? "#FB2576" : "#FB2576"};
        --color-picker-background-color: ${currentTheme==="light" ? "#dfdfdf" : "#3F0071"};
        --website-tile-border-color: ${currentTheme==="light" ? "#000" : "#FB2576"};
        --slide-up-background-color: ${currentTheme==="light" ? "#dfdfdf" : "#000"};
        --slide-up-text-color: ${currentTheme==="light" ? "#000": "#808080"};
        --close-button-color: ${currentTheme==="light" ? "#000" : "#808080"};
        --close-button-hover-color: ${currentTheme==="light" ? "#808080" : "#fff"};
        --loading-state: ${loading ? "100vw" : "0"};
        --hide-loader: ${loading ? "0": "-5px"};
      }
      `}</style>
      <Component {...pageProps} changeTheme={setTheme} currentTheme={currentTheme}/>
    </>
  );
}

export default MyApp;