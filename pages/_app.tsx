import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import Router from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const [light, setLight] = useState(true);
  const [loading, setLoading] = useState(false);

  function setTheme(theme: string) {
    setLight(theme==="light" ? true : false);
    window.localStorage.setItem("theme", theme);
  }

  useEffect(() => {
    const theme = window.localStorage.getItem("theme");
    if (!theme || theme==="light") {
      setLight(true);
    } else {
      setLight(false);
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
        --header-background-color: ${light ? "#f3f3f3" : "#212121"};
        --header-text-color: ${light ? "#000" : "#afafaf"};
        --header-border-color: ${light ? "#000" : "#afafaf"};
        --logout-background-color: ${light ? "#cecece" : "white"};
        --logout-text-color: #000;
        --hamburger-invert: ${light ? "0" : "0.7"};
        --main-background-color: ${light ? "#fff" : "#000"};
        --main-text-color: ${light ? "#000" : "#fff"};
        --main-fancy-text-color: ${light ? "#FB2576" : "#FB2576"};
        --color-picker-background-color: ${light ? "#dfdfdf" : "#3F0071"};
        --website-tile-border-color: ${light ? "#000" : "#FB2576"};
        --slide-up-background-color: ${light ? "#dfdfdf" : "#000"};
        --slide-up-text-color: ${light ? "#000": "#808080"};
        --close-button-color: ${light ? "#000" : "#808080"};
        --close-button-hover-color: ${light ? "#808080" : "#fff"};
        --loading-state: ${loading ? "100vw" : "0"};
        --hide-loader: ${loading ? "0": "-5px"};
      }
      `}</style>
      <Component {...pageProps} changeTheme={setTheme}/>
    </>
  );
}

export default MyApp;