import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import Loading from '../components/loading/Loading';
import Router from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("dark");
  const [customTheme, setCustomTheme] = useState<any>(null);
  
  function setTheme(theme: string) {
    if (theme === "custom") {
      const localStorageCustom = window.localStorage.getItem("customTheme");
      if (localStorageCustom) {
        let localStorageCustomJSON = JSON.parse(localStorageCustom);
        setCustomTheme(localStorageCustomJSON);
      }
    }
    setCurrentTheme(theme);
    window.localStorage.setItem("theme", theme);
  }

  function changeVar(key: string, value: string, check?: boolean) {
    if (check) {
      setTheme("custom");
      return;
    }
    const changingTheme = {...customTheme};
    changingTheme[key] = value;
    setCustomTheme(changingTheme);
  }

  useEffect(() => {
    const theme = window.localStorage.getItem("theme");
    if (!theme || theme==="light") {
      setCurrentTheme("light");
    } else if (theme === "custom") {
      const localStorageCustom = window.localStorage.getItem("customTheme");
      if (localStorageCustom) {
        let localStorageCustomJSON = JSON.parse(localStorageCustom);
        setCustomTheme(localStorageCustomJSON);
      }
      setCurrentTheme("custom");
    } else {
      setCurrentTheme(theme);
    }

    const start = () => setLoading(true);
    const end = () => setLoading(false);

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);

    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);
  //@ts-ignore
  return (
    <>
      <Loading/>
      <style global jsx>{`
        :root {
          --header-background-color: ${currentTheme==="light" ? "#f3f3f3" : currentTheme==="dark" ? "#212121" : customTheme["--header-background-color"]};
          --header-text-color: ${currentTheme==="light" ? "#000000" : currentTheme==="dark" ? "#afafaf" : customTheme["--header-text-color"]};
          --header-border-color: ${currentTheme==="light" ? "#000000" : currentTheme==="dark" ? "#afafaf": customTheme["--header-border-color"]};
          --logout-background-color: ${currentTheme==="light" ? "#cecece" : currentTheme==="dark" ? "#ffffff" : customTheme["--logout-background-color"]};
          --logout-text-color: ${currentTheme==="custom" ? customTheme["--logout-text-color"] : "#000000"};
          --hamburger-invert: ${currentTheme==="light" ? "0" : currentTheme==="dark" ? "0.7": "0.7"};
          --main-background-color: ${currentTheme==="light" ? "#ffffff" : currentTheme==="dark" ? "#000000": customTheme["--main-background-color"]};
          --main-text-color: ${currentTheme==="light" ? "#000000" : currentTheme==="dark" ? "#ffffff": customTheme["--main-text-color"]};
          --main-fancy-text-color: ${currentTheme==="light" ? "#FB2576" : currentTheme==="dark" ? "#FB2576": customTheme["--main-fancy-text-color"]};
          --color-picker-background-color: ${currentTheme==="light" ? "#dfdfdf" : currentTheme==="dark" ? "#3F0071": customTheme["--color-picker-background-colo"]};
          --website-tile-border-color: ${currentTheme==="light" ? "#000000" : currentTheme==="dark" ? "#FB2576": customTheme["--website-tile-border-color"]};
          --slide-up-background-color: ${currentTheme==="light" ? "#dfdfdf" : currentTheme==="dark" ? "#000000": customTheme["--slide-up-background-color"]};
          --slide-up-text-color: ${currentTheme==="light" ? "#000000": currentTheme==="dark" ? "#808080": customTheme["--slide-up-text-color"]};
          --close-button-color: ${currentTheme==="light" ? "#000000" : currentTheme==="dark" ? "#808080": customTheme["--close-button-color"]};
          --close-button-hover-color: ${currentTheme==="light" ? "#808080" : currentTheme==="dark" ? "#ffffff": customTheme["--close-button-hover-color"]};
          --loading-state: ${loading ? "100vw" : "0"};
          --hide-loader: ${loading ? "0" : "-10px"};
          --window-hitbox-opacity: 0;
          --scrollbar-color: ${currentTheme==="custom" ? customTheme["--scrollbar-color"] : "#1f1f1f"};
        }
      `}</style>
      <Component {...pageProps} changeTheme={setTheme} currentTheme={currentTheme} changeVar={changeVar}/>
    </>
  );
}

export default MyApp;