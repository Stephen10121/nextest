import { ChangeEvent, useEffect, useState } from "react";
import styles from "./ColorInput.module.css";

interface Props {
    children: any;
    onChange: (arg0: string) => void;
    defualtValue: string;
    saveData: () => void;
}

const ColorInput = ({ children, onChange, defualtValue, saveData }: Props) => {
    const [val, setVal] = useState(defualtValue);

    function colorChange(event: ChangeEvent<HTMLInputElement> | undefined) {
        if (event) {
            onChange(event.target.value);
            setVal(event.target.value);
        }
    }

    return(
        <div className={styles.row}>
            <h1>{children}</h1>
            <input type="color" name={children} id={children} onChange={colorChange} value={val} onBlur={saveData}/>
        </div>
    );
}

export default ColorInput;