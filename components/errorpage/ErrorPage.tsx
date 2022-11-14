import Head from 'next/head';
import components from './ErrorPage.module.css';

const ErrorPage = () => {
  return (
    <div className={components.error}>
      <Head>
        <title>Error</title>
      </Head>
      <h1>This is an error page.</h1>
    </div>
  );
}


export default ErrorPage;