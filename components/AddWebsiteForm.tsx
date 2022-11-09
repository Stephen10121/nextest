import { useState } from "react";
import InputBox from "./InputBox";

const AddWebsiteForm = () => {
    const [ link, setLink ] = useState("");

    function setInput(value: string) {
        console.log(value);
    }

    function setLinkFunc(value: string) {
        setLink(value);
    }

    return (
        <>
            <InputBox setValue={setInput} placeHolder="Name" name="nickname"/>
            <br />
            <InputBox setValue={setLinkFunc} placeHolder="Server URL" name="website" />
            {link ? <a href={link} rel="noreferrer" target="_blank">Test Link</a> : null }
            <br />
            <br />
            <br />
            <h1>requirements</h1>
            <ul>
                <li>something</li>
            </ul>
        </>
    );
}

export default AddWebsiteForm;