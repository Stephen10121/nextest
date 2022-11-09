import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps =async (context) => {
    context.res.setHeader(
        "Set-Cookie", [`G_DASH=deleted; Max-Age=0`]
    );
    return {
        redirect: {
            permanent: false,
            destination: "/",
        },
    }
}

const Logout = () => {
    return(
        <h1>Loggin out</h1>
    );
}

export default Logout;