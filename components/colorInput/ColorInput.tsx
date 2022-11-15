import { ChangeEvent } from "react";
import styles from "./ColorInput.module.css";

interface Props {
    children: any;
    onChange: (arg0: string) => void;
    defualtValue: string;
}

const ColorInput = ({ children, onChange, defualtValue }: Props) => {
    function colorChange(event: ChangeEvent<HTMLInputElement> | undefined) {
        if (event) {
            onChange(event.target.value);
        }
    }
    return(
        <div className={styles.row}>
            <h1>{children}</h1>
            <input type="color" name={children} id={children} onChange={colorChange} value={defualtValue}/>
        </div>
    );
}

export default ColorInput;