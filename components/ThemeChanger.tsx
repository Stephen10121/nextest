import components from "../styles/ThemeChanger.module.css";

const ThemeChanger = () => {
    return (
        <section className={components.themeChanger}>
            <div className={components.themeText}>
                <h1>Change Theme</h1>
            </div>
            <div className={components.themeOptions}>
                <fieldset>
                    <legend className={components.textGone}>Pick a color theme</legend>
                    <label htmlFor="light" className={components.textGone}>Light</label>
                    <input type="radio" name="theme" id="light" className={components.light} defaultChecked={true}/>
                    <label htmlFor="dark" className={components.textGone}>Dark</label>
                    <input type="radio" name="theme" id="dark" className={components.dark} />
                </fieldset>
            </div>
        </section>
    );
}

export default ThemeChanger;