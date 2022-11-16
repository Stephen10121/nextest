import { useState } from "react";
import styles from "./MovableWindow.module.css";

interface Props {
    children: any;
    title: string;
    closeFunc: (top: number, left: number) => void;
    y?: number;
    x?: number;
}

const MovableWindow = ({ children, title, closeFunc, x, y }: Props) => {
    const [hitBoxBig, setHitBoxBig] = useState(false);
    const [top, setTop] = useState(y ? y : 0);
    const [left, setLeft] = useState(x ? x : 0);
    const [prevX, setPrevX] = useState(0);
    const [prevY, setPrevY] = useState(0);

    function mouseMoving(e: any) {
        if (!hitBoxBig) {
            return
        }
        setLeft(e.pageX - prevX);
        setTop(e.pageY - prevY);
    }

    function mouseDown(e: any) {
        let style = document.querySelector("#style")?.getBoundingClientRect();
        if (!style || style===null) {
            return;
        }
        setPrevX(e.pageX-style.left)
        setPrevY(e.pageY-style.top);
        setHitBoxBig(true);
    }

    return(
        <section className={styles.body} id="style" style={{left: `${left}px`, top: `${top}px`}}>
            <section className={styles.header}>
                <h1>{title}</h1>
                <button title="Close Popup" className={styles.closeButton} onClick={() => closeFunc(top, left)}>&times;</button>
                <div className={`${styles.cover} ${hitBoxBig ? styles.bigBox : ""}`} onMouseDown={mouseDown} onMouseUp={() => {setHitBoxBig(false)}} onMouseMove={mouseMoving}></div>
            </section>
            <section className={styles.main}>
                {children}
            </section>
        </section>
    );
}

export default MovableWindow;