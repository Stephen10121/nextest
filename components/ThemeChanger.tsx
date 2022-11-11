import components from "../styles/ThemeChanger.module.css";

const ThemeChanger = ({changeTheme}: {changeTheme: any}) => {
    let theme: any = "light";
    if (typeof window !== "undefined") {
        theme = window.localStorage.getItem("theme");
    }
    return (
        <section className={components.themeChanger}>
            <div className={components.themeText}>
                <h1>Theme</h1>
            </div>
            <div className={components.themeOptions}>
                <fieldset>
                    <legend className={components.textGone}>Pick a color theme</legend>
                    <label htmlFor="light" className={components.textGone}>Light</label>
                    <input type="radio" name="theme" id="light" className={components.light} defaultChecked={theme==="light" ? true : false} onClick={() => changeTheme("light")}/>
                    <label htmlFor="dark" className={components.textGone}>Dark</label>
                    <input type="radio" name="theme" id="dark" className={components.dark} defaultChecked={theme==="dark" ? true : false} onClick={() => changeTheme("dark")}/>
                </fieldset>
            </div>
        </section>
    );
}

export default ThemeChanger;