import Head from "next/head";
import dynamic from "next/dynamic";
import axios from "axios";
import sty from "../styles/discover.module.css";
import SkeletonCard from "./SkeletonCard";
const Cardlayout = dynamic(() => import("./Card"), {
  loading: () => <SkeletonCard />,
  ssr: false,
});
import Footer from "./Footer";
import CustomAlert from "./CustomAlert";
import { useEffect, useState } from "react";

const Myfavourites = (props) => {
  // console.log(props)
  let liked = true;
  const { snips_liked, token } = props;
  // console.log(snips_liked)
  const cards = snips_liked;
  const [fToken, setFToken] = useState(token);
  const [favourite, setFavourite] = useState(cards);

  console.log(cards, " yeee");
  console.log(favourite, " yeee22");

  useEffect(async () => {
    try {
      const result = await axios.get(
        `http://localhost:5000/dashboard`,
        { headers: { Authorization: `${token}` } }
      );
      if (result) {
        const { data } = result;
        const info = data.info;
        const snip = data.snip;
        const favres = await axios.get(
          `http://localhost:5000/favsnip`,
          { headers: { Authorization: `${token}` } }
        );
        if (favres) {
          const { status, data } = favres;
          var favsnip;
          status == 200 ? (favsnip = data) : (favsnip = { snips_liked: [] });
          setFavourite(favsnip)
          setFToken(token)
        }
      }
    } catch (err) {
      console.log("naaaah");
    }
    
    
  }, [])





  return (
    <>
      <Head>
        <title>Favourites</title>
      </Head>
    <div className="md:ml-40 min-h-screen  max-h-full flex flex-col bg-thr_bg">
      <div>
        <h4 className="text-black">
          All Favorite Snippets
        </h4>
      </div>

      <div className={` ${sty.card}`} >
          {(cards.length > 0) ? (
            cards.map(card => (
                <Cardlayout {...card} key={card._id} profile_api='https://source.unsplash.com/500x500/?face' token={token} liked={liked} />
            ))
          ) :
          (
            <div className="flex justify-center align-middle">
              <p className="text-lg text-black font-bold">
                You have not liked any snippets yet!
              </p>
            </div>
          )


          }
      </div>

      
      {/* <div className={`md:ml-40 min-h-screen w-full max-h-full lg:flex  bg-thr_bg`}>
        {(favourite.length > 0) ? (
          favourite.map((favourite) => (
            <Cardlayout
              {...favourite}
              key={favourite._id}
              profile_api="https://image.unsplash.com/500x500/?face"
              token={fToken}
              liked={liked}
            />
          ))
        ) : (
          <div className="flex justify-center align-middle">
            <p className="text-lg text-black font-bold">
              You have not liked any snippets yet!
            </p>
          </div>
        )}
      </div> */}
      </div>
      <CustomAlert />
      <div className="ml-5">
        <Footer />
      </div>
    </>
  );
};

export default Myfavourites;
