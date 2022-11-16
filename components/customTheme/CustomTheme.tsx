import { useEffect, useState } from "react";
import { changeCssVar, getAllCSSVariableNames, getElementCSSVariables } from "../../scripts/cssVar";
import ColorInput from "../colorInput/ColorInput";
import styles from "./CustomTheme.module.css";

export type ChangeVarProp = (key: string, value: string, multi?: boolean) => void;

const CustomTheme = ({ changeVar, saveData }: { changeVar: ChangeVarProp, saveData: () => void }) => {
    const [vars, setVars] = useState<any>(null);
    const [inputs, setInputs] = useState<null | Array<JSX.Element | null>>(null);

    function change(variable: string, color: string) {
        changeVar(variable, color);
        // changeCssVar(variable, color, document.querySelector(':root'));
    }

    useEffect(() => {
        setVars(getElementCSSVariables(getAllCSSVariableNames(document.styleSheets), document.body, document.documentElement));
    }, []);

    useEffect(() => {
        if (vars) {
            setInputs(Object.keys(vars).map((key, index) => key.includes("color") ? <ColorInput saveData={saveData} key={index} onChange={(value) => change(key, value)} defualtValue={vars[key]}>{key}</ColorInput> : null));
        }
    }, [vars]);

    return(
        <section className={styles.list}>
            {inputs ? inputs : null}
            <div className={styles.row2}>
                <input type="text" placeholder="Paste Custom JSON" />
                <button className={styles.save}>Copy Style JSON</button>
            </div>
        </section>
    );
}

export default CustomTheme;