import Link from "next/link";
import components from "../styles/WebsitesPage.module.css";
import AddWebsiteComp from "./AddWebsiteComp";

export type Website = {
    id: string,
    name: string,
    active: boolean
}

const WebsiteDiv = ({ website }: {website?: Website}) => {
    if (!website) {
        return(<AddWebsiteComp />);
    }
    return(
        <Link href={`/websites/${website.id}`} passHref>
            <a rel="noopener" className={components.websitesInner}>
                <h1 className={components.name}>{website.name}</h1>
                <div><p>Status</p><div className={website.active ? components.active : components.inactive}/></div>
            </a>
        </Link>
    );
}

export default WebsiteDiv;