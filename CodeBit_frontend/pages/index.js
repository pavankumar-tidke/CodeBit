
import Footer from "../Components/Footer";
import HeroHome from "../Components/HeroHome";
import Features from "../Components/Features";
import Head from "next/head";
import { StrictMode } from "react";


export default function Component() {
 
  return (
    // onKeyDown={() => this.handleRoshHotkey()}
    <>
    {/* <StrictMode> */}
    <Head>
        <title>Index.js</title>
    </Head>
      <main className="flex-grow dark">
        <HeroHome />
        <Features />
        {/* <Count /> */}
      </main>
      <Footer />
      {/* </StrictMode> */}
    </>
  );
}
