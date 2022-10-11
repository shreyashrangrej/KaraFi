import Head from 'next/head';
import { Navbar } from '../components/Navbar';

function HomePage() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div>Hello World</div>
    </div>
  )
}

export default HomePage;
