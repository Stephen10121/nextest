import components from "../styles/WebsitesPage.module.css";
import WebsiteDiv, { Website } from "./WebsiteDiv";

const WebsitesArray = ({ websites }: { websites: Website[] }) => {
    return (
        <section className={components.websites}>
            {websites.map((website) => <div className={components.website} key={website.id}><WebsiteDiv website={website}/></div>)}
            <div className={components.website}><WebsiteDiv /></div>
        </section>
    );
}

export default WebsitesArray;