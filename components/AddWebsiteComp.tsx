import { useState } from "react";
import components from "../styles/WebsitesPage.module.css";
import AddWebsiteForm from "./AddWebsiteForm";
import SlideUpComponent from "./slideupcomponent/SlideUpComponent";

const AddWebsiteComp = () => {
    const [showForm, setShowForm] = useState(false);

    return (
        <>
            {showForm ? 
                <SlideUpComponent stopShowingForm={setShowForm} title="Add a website">
                    <AddWebsiteForm />
                </SlideUpComponent>
            : null}
            <button className={components.buttonNew} onClick={() => {
                setShowForm(true);
            }}>
                    <h1 className={components.name}>Add a website</h1>
            </button>
        </>
    );
}

export default AddWebsiteComp;