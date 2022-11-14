import { GetServerSideProps } from "next";
import Head from "next/head";
import Header from "../../components/header/Header";
import { CurrentTheme } from "../../components/themechanger/ThemeChanger";
import checkUser from "../../scripts/checkUser";
import components from "../../styles/WebsitesPage.module.css";

export const getServerSideProps: GetServerSideProps =async (context) => {
    const checkedUser = await checkUser(context);
    if (checkedUser.error || !checkedUser.data) {
        return {
            props: {
              loggedIn: false
            }
        }
    }
  
    return {
      props: {
        loggedIn: true
      }
    }
}

const Contact = ({ loggedIn, changeTheme, currentTheme }: {loggedIn: boolean, changeTheme: any, currentTheme: CurrentTheme }) => {
    return(
        <>
            <Head>
                <title>Contact</title>
                <meta name="description" content="Websites that you created." />
                <link rel="icon" href="/dashboard.png" />
            </Head>
            <Header loggedIn={loggedIn} changeTheme={changeTheme} where="contact" currentTheme={currentTheme}>Contact</Header>
            <section className={components.websites}>
                <h1>Contact someone</h1>
            </section>
        </>
    );
}

export default Contact;