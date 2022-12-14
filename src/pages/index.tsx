import type { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";

const CreateLink = dynamic(() => import("../components/CreateLink"), {
  ssr: false,
});

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create slug Form</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ paddingLeft: "20px" }}>
        <h1>Create slug Form</h1>
        <CreateLink />
      </div>
    </>
  );
};

export default Home;
