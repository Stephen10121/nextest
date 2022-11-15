import { useEffect, useState } from "react";
import { changeCssVar, getAllCSSVariableNames, getElementCSSVariables } from "../../scripts/cssVar";
import ColorInput from "../colorInput/ColorInput";
import styles from "./CustomTheme.module.css";

const CustomTheme = ({ close }: { close: () => void }) => {
    const [vars, setVars] = useState<any>(null);
    const [inputs, setInputs] = useState<null | Array<JSX.Element | null>>(null);
    let root: Element | null;

    useEffect(() => {
        root = document.querySelector(':root');
        setVars(getElementCSSVariables(getAllCSSVariableNames(document.styleSheets), document.body, document.documentElement))
    }, []);

    function change(variable: string, color: string) {
        changeCssVar(variable, color, document.querySelector(':root'));
    }

    useEffect(() => {
        if (vars) {
            setInputs(Object.keys(vars).map((key, index) => key.includes("color") ? <ColorInput key={index} onChange={(value) => change(key, value)} defualtValue={vars[key]}>{key}</ColorInput> : null));
        }
    }, [vars]);

    return(
        <section className={styles.body}>
            <section className={styles.header}>
                <h1>Custom Style</h1>
                <button title="Close Popup" className={styles.closeButton} onClick={close}>&times;</button>
            </section>
            <section className={styles.list}>
                {inputs ? inputs : null}
            </section>
        </section>
    );
}

export default CustomTheme;