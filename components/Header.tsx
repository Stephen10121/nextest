import Link from "next/link";
import { useState } from "react";
import components from "../styles/Header.module.css";
import Image from "next/image";

const Header = ({ children, where, loggedIn }: { children: any, where: "websites" | "home" | "contact" | "singleWebsite", loggedIn: boolean }) => {
    const [showNav, setShowNav] = useState(false);

    function showSmallNav() {
        setShowNav(showNav ? false : true);
    }

    return(
        <header className={components.header}>
            <h1>{children}</h1>
            <nav className={components.goto}>
                <button onClick={showSmallNav} className={[components.hamburgerButton, showNav? components.buttonRotate : components.buttonUnRotate].join(" ")}>
                    <Image src="/hamburger.png" alt="Menu" layout="fill"/>
                </button>
                <ul>
                    {where != "home" ? <li><Link href="/" passHref><a rel="noopener"><p>Home</p></a></Link></li> : null}
                    {where != "websites" && loggedIn ? <li><Link href="/websites" passHref><a rel="noopener"><p>Websites</p></a></Link></li> : null}
                    {where != "contact" ? <li><Link href="/contact" passHref><a rel="noopener"><p>Contact</p></a></Link></li> : null}
                    { loggedIn ? <li className={components.logout}><Link href="/logout" passHref><a rel="noopener"><p>Logout</p></a></Link></li> : <li><Link href="/login" passHref><a rel="noopener"><p>Login</p></a></Link></li>}
                </ul>
            </nav>
            <section className={[components.overflow, showNav ? components.notgone : components.gone].join(' ')}>
                <ul>
                    {where != "home" ? <li><Link href="/" passHref><a rel="noopener"><p>Home</p></a></Link></li> : null}
                    {where != "websites" && loggedIn ? <li><Link href="/websites" passHref><a rel="noopener"><p>Websites</p></a></Link></li> : null}
                    {where != "contact" ? <li><Link href="/contact" passHref><a rel="noopener"><p>Contact</p></a></Link></li> : null}
                    { loggedIn ? <li className={components.logout}><Link href="/logout" passHref><a rel="noopener"><p>Logout</p></a></Link></li> : <li><Link href="/login" passHref><a rel="noopener"><p>Login</p></a></Link></li>}
                </ul>
            </section>
        </header>
    );
}

export default Header;