import { GetServerSideProps } from "next";
import Head from "next/head";
import Header from "../../components/header/Header";
import WebsitesArray from "../../components/WebsitesArray";
import checkUser, { UserData } from "../../scripts/checkUser";
import { POST_SERVER } from "../../scripts/ip";
import components from "../../styles/WebsitesPage.module.css";
import { Website } from "../../components/WebsiteDiv"; 
import { CurrentTheme } from "../../components/themechanger/ThemeChanger";

export const getServerSideProps: GetServerSideProps =async (context) => {
    const checkedUser = await checkUser(context);
    if (checkedUser.error || !checkedUser.data || !checkedUser.cookie) {
      return {
        props: {
          error: true
        },
        redirect: {
          permanent: false,
          destination: "/login?redirect=/websites",
        },
      }
    }
    let websitesJson;
    try {
        const fetchWebsites = await fetch(`${POST_SERVER}websites`, {headers: {"Authentication": `Bearer ${checkedUser.cookie}`}});
        websitesJson = await fetchWebsites.json();
    } catch (err) {
        return {
            props: {
                data: checkedUser.data,
                error: true
            }
        }
    }
    if (websitesJson.error) {
        return {
            props: {
                data: checkedUser.data
            }
        }
    }
  
    return {
      props: {
        data: checkedUser.data,
        websites: websitesJson.websites as Website[]
      }
    }
}

const Websites = ({data, websites, changeTheme, currentTheme}: { data: UserData, websites?: Website[], changeTheme: any, currentTheme: CurrentTheme }) => {
    return(
        <>
            <Head>
                <title>Websites</title>
                <meta name="description" content="Websites that you created." />
                <link rel="icon" href="/dashboard.png" />
            </Head>
            <Header loggedIn={true} changeTheme={changeTheme} where="websites" currentTheme={currentTheme}>Websites</Header>
            {!websites ? <section className={components.errorWebsitesLoad}><h1>Error loading websites</h1></section>: <WebsitesArray websites={websites} />}
        </>
    );
}

export default Websites;