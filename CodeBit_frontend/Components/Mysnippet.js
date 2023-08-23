import Head from "next/head";
import dynamic from "next/dynamic";
import sty from "../styles/discover.module.css";
import SkeletonCard from "./SkeletonCard"; 
const Cardlayout = dynamic(() => import("./Card"), {
  loading: () => <SkeletonCard />,
  ssr: false,
});
import Footer from "./Footer";
import CustomAlert from "./CustomAlert";

const MySnippet = (props) => {
  const { snip, token } = props;
  const cards = snip;
  // console.log(snip)
  return (
    <>
      <Head>
        <title>My Snippets</title>
      </Head>
      <div className={`md:ml-40 min-h-screen flex flex-col max-h-full lg:flex  bg-thr_bg `}>
        <div>
          <h4 className="ml-8 text-black">
            My Snippets
          </h4>
        </div>
        <div className={ ` ${sty.card}`}>
          {/* <div>
            <span className="text-2xl text-black">My Snippets</span>
          </div> */}
        
          {cards.length ? (
            cards.map((card) => (
              <Cardlayout
                {...card}
                key={card._id}
                profile_api="https://source.unsplash.com/500x500/?face"
                token={token}
              />
            ))
          ) : (
            <div className="flex justify-center  align-middle">
              <p className="text-lg text-black mx-auto text-center font-bold">
                You Don't Have Any Snippets!
              </p>
            </div>
          )}
        </div>
      </div>
      <CustomAlert />
      <div className="ml-5">
        <Footer />
      </div>
    </>
  );
};

export default MySnippet;
