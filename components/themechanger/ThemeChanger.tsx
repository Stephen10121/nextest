import components from "./ThemeChanger.module.css";
import { useEffect } from "react";

export type CurrentTheme = "light" | "dark"; 

const ThemeChanger = ({changeTheme, currentTheme}: {changeTheme: any, currentTheme: CurrentTheme}) => {
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
            </fieldset>
        </section>
    );
}

export default ThemeChanger;