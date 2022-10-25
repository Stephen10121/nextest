import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";

const Try: NextPage = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return(
        <h1>Try {data}</h1>
    )
}

export default Try;


export const getServerSideProps: GetServerSideProps = async (context) => {
    const { params } = context;
    //@ts-ignore
    const { id } = params;
    const response = await fetch(`http://192.168.0.24:3000/api/names/${id}`);
    const data = await response.json();

    return {
        props: {
            data
        }
    }
}