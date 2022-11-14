import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import Head from "next/head";
import Header from "../../components/header/Header";
import SingleWebsite from "../../components/SingleWebsite";
import { CurrentTheme } from "../../components/themechanger/ThemeChanger";
import { Website } from "../../components/WebsiteDiv";
import checkUser from "../../scripts/checkUser";
import { POST_SERVER } from "../../scripts/ip";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { params } = context;
    //@ts-ignore
    const { id } = params;
    const checkedUser = await checkUser(context);
    if (checkedUser.error || !checkedUser.data || !checkedUser.cookie) {
      return {
        redirect: {
          permanent: false,
          destination: `/login?redirect=/websites/${id}`,
        },
      }
    }

    let websiteData;
    try {
        const websiteInfoGet = await fetch(`${POST_SERVER}website?id=${id}`);
        websiteData = await websiteInfoGet.json();
    } catch (err) {
        return {
            notFound: true,
            props: {
                error: true
            }
        }
    }

    if (!websiteData.website) {
        return {
            notFound: true,
            props: {
                error: true
            }
        }
    }

    return {
      props: {
        id,
        websiteData: websiteData.website
      }
    }
}

const Try = ({ id, error, websiteData, changeTheme, currentTheme }: { id?: string, error?:boolean, websiteData?: Website, changeTheme: any, currentTheme: CurrentTheme }) => {
    if (error || !id || !websiteData) {
        return(
            <h1>Error Loading data</h1>
        );
    }
    return(
        <>
            <Head>
                <title>{websiteData.name}</title>
                <meta name="robots" content="noindex" />
                <link rel="icon" href="/dashboard.png" />
            </Head>
            <Header loggedIn={true} where="singleWebsite" changeTheme={changeTheme} currentTheme={currentTheme}>{websiteData.name}</Header>
            <SingleWebsite data={websiteData} />
        </>
    );
}

export default Try;

