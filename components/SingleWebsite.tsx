import { Website } from "./WebsiteDiv";

const SingleWebsite = ({ data: { id, active } }: { data: Website }) => {
    return(
        <div>
            <h1>{id}</h1>
            <p>this website is {active ? null : "not"} active</p>
        </div>
    );
}

export default SingleWebsite;