import components from "../styles/InputBox.module.css";

type Props = {
    setValue: (value: string) => void;
    placeHolder?: string;
    name?: string;
    width?: string;
    height?: string;
}

type Styles = {
    width?: string;
    height?: string;
}

const InputBox = ({ setValue, placeHolder, width, height, name }: Props) => {
    function changeValue(event: any) {
        setValue(event.target.value);
    }

    let styles = {} as Styles

    if (width) {
        styles.width = width;
    }
    if (height) {
        styles.height = height;
    }

    return(
        <input type="text" name={name? name : "none"} className={components.input} placeholder={placeHolder} onChange={changeValue} style={styles} />
    );
}

export default InputBox;