import components from "./ThemeChanger.module.css";
import { useEffect, useState } from "react";
import CustomTheme from "../customTheme/CustomTheme";

export type CurrentTheme = "light" | "dark" | "custom"; 

const ThemeChanger = ({changeTheme, currentTheme}: {changeTheme: any, currentTheme: CurrentTheme}) => {
    const [showCustom, setShowCustom] = useState(false);
    useEffect(() => {
        //@ts-ignore
        document.querySelector(`#${currentTheme}`).checked = true;
    }, [currentTheme]);

    return (
        <section className={components.themeChanger}>
            <fieldset>
                <legend className={components.textGone}>Pick a color theme</legend>
                <label htmlFor="light" className={components.textGone}>Light</label>
                <input type="radio" name="theme" id="light" className={components.light} defaultChecked={currentTheme==="light" ? true : false} onClick={() => changeTheme("light")}/>
                <label htmlFor="dark" className={components.textGone}>Dark</label>
                <input type="radio" name="theme" id="dark" className={components.dark} defaultChecked={currentTheme==="dark" ? true : false} onClick={() => changeTheme("dark")}/>
                <label htmlFor="custom" className={components.textGone}>Dark</label>
                <input type="radio" name="theme" id="custom" className={components.dark} defaultChecked={currentTheme==="custom" ? true : false} onClick={() => changeTheme("custom")}/>
            </fieldset>
            {showCustom ? <CustomTheme close={() => setShowCustom(false)}/> : null}
        </section>
    );
}

export default ThemeChanger;