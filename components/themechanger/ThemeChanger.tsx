import components from "./ThemeChanger.module.css";
import { useEffect, useState } from "react";
import CustomTheme, { ChangeVarProp } from "../customTheme/CustomTheme";
import MovableWindow from "../movableWindow/MovableWindow";
import { getAllCSSVariableNames, getElementCSSVariables } from "../../scripts/cssVar";

export type CurrentTheme = "light" | "dark" | "custom"; 

const ThemeChanger = ({changeTheme, currentTheme, changeVar }: { changeVar: ChangeVarProp, changeTheme: any, currentTheme: CurrentTheme}) => {
    const [showCustom, setShowCustom] = useState(false);
    const [buttonShowCustom, setButtonShowCustom] = useState(false);
    const [customThemePosition, setCustomThemePosition] = useState({x: 0, y: 0});

    function saveCustomProperties() {
        window.localStorage.setItem("customTheme", JSON.stringify(getElementCSSVariables(getAllCSSVariableNames(document.styleSheets), document.body, document.documentElement)));
        changeVar("0", "0", true);
    }

    useEffect(() => {
        //@ts-ignore
        document.querySelector(`#${currentTheme}`).checked = true;
        if (currentTheme === "custom") {
            setButtonShowCustom(true);
        }
    }, [currentTheme]);

    return (
        <section className={components.themeChanger}>
            <fieldset>
                <legend className={components.textGone}>Pick a color theme</legend>
                <label htmlFor="light" className={components.textGone}>Light</label>
                <input type="radio" name="theme" id="light" className={components.light} defaultChecked={currentTheme==="light" ? true : false} onClick={() => {changeTheme("light");setButtonShowCustom(false)}}/>
                <label htmlFor="dark" className={components.textGone}>Dark</label>
                <input type="radio" name="theme" id="dark" className={components.dark} defaultChecked={currentTheme==="dark" ? true : false} onClick={() => {changeTheme("dark");setButtonShowCustom(false)}}/>
                <label htmlFor="custom" className={components.textGone}>Dark</label>
                <input type="radio" name="theme" id="custom" className={components.custom} defaultChecked={currentTheme==="custom" ? true : false} onClick={() => {changeTheme("custom");setButtonShowCustom(true)}}/>
            </fieldset>
            {buttonShowCustom ? <div className={components.showCustom}><button onClick={() => setShowCustom(true)}>Edit Custom Colors</button></div> : null}
            {showCustom ? <MovableWindow title="Color Editor (BETA)" x={customThemePosition.x} y={customThemePosition.y} closeFunc={(top, left) => {setShowCustom(false);saveCustomProperties();setCustomThemePosition({x: left, y: top})}}><CustomTheme saveData={saveCustomProperties} changeVar={changeVar}/></MovableWindow> : null}
        </section>
    );
}

export default ThemeChanger;