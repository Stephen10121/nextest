import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import ErrorPage from '../../components/errorpage/ErrorPage';
import User from '../../components/user/User';
import components from "../../styles/SearchPage.module.css";

type User = {
  name: string,
  type: "name" | "channel",
  active: boolean
}

type Data = {
    data: User[]
}

export const getServerSideProps: GetServerSideProps =async (context) => {
  const { query } = context;
  if (!query.query) {
    return {
      props: {
        error: true
      }
    }
  }

  const apiUrl = `http://vercel.gruzservices.com/api/names/${query.query}`;
  const fetched = await fetch(apiUrl);
  const fetchedJson = await fetched.json() as Data;
  return {
    props: {
      userData: fetchedJson.data,
      error: false
    }
  }
}

const Search = ({ userData, error }: { userData: User[], error: boolean }) => {
  if (error) {
    return (<ErrorPage />);
  }

  return (
    <>
      <Head>
        <title>Jeff</title>
      </Head>
      <h1>Results</h1>
      <div className={components.users}>
        {userData.map((user: User) => <User key={user.name.toString()} name={user.name} type={user.type} active={user.active} />)}
      </div>
    </>
  );
}


export default Search;