import { Dispatch, SetStateAction, useState } from "react";
import components from "./SlideUpComponent.module.css";
const SlideUpComponent = ({ children, stopShowingForm, title }: { children: any, stopShowingForm: Dispatch<SetStateAction<boolean>>, title?: string }) => {
    const [close, setClose] = useState(false);

    function closeComponent() {
        setClose(true);
        setTimeout(() => {
            stopShowingForm(false);
        }, 350);
    }

    return (
        <section className={[components.addWebsite, close ? components.removeWebsite : components.showWebsite].join(" ")}>
            <header className={components.header}>
                <h1 className={components.title}>{title ? title : null}</h1>
                <button title="Close Popup" className={components.closeButton} onClick={closeComponent}>&times;</button>
            </header>
            <main className={components.main}>
                {children}
            </main>
        </section>
    );
}

export default SlideUpComponent;