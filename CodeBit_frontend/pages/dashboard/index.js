import { requireAuthentication } from "../../utils/authHOC";
import axios from "axios";
import { useState, useEffect } from "react";
import Mysnippet from "../../Components/Mysnippet";
import Myfavorites from "../../Components/Myfavourites";
import Mydashboard from "../../Components/Mydashboard";
import Create from "../../Components/Create";
import CustomAlert from "../../Components/CustomAlert";
import { useContext } from "react";
import { AlertContext } from "../../utils/contexts";
import Image from "next/image";
import Head from "next/head";

export default function Dashboard(props) {
  const { info, snip, favsnip, token } = props;

  const [edit, setEdit] = useState({ readOnly: true });
  const { setAlert } = useContext(AlertContext);

  const [details, setDetails] = useState({
    username: info.user_id.username,
    fullname: info.fullname,
    email: info.user_id.email,
    bio: info.bio,
    occupation: info.occupation,
    location: info.location,
  });

  const updateDashboard = async () => {
    try {
      const res = await axios.post(
        `http://localhost:5000/mydashboard/edit`,
        details,
        { headers: { Authorization: `${token}` } }
      );

      if (res) {
        setAlert({
          open: true,
          msg: res.data.msg,
          type: "success",
        });
        setEdit({ readOnly: true });
      } else {
        setAlert({
          open: true,
          msg: "Something went wrong",
          type: "warning",
        });
      }
    } catch (error) {
      setAlert({
        open: true,
        msg: error,
        type: "warning",
      });
    }

    // console.log(edit);
  };

  // console.log(snip, 'snip prop')
  function useMediaQuery(query) {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
      const media = window.matchMedia(query);
      if (media.matches !== matches) {
        setMatches(media.matches);
      }
      const listener = () => {
        setMatches(media.matches);
      };
      media.addListener(listener);
      return () => media.removeListener(listener);
    }, [matches, query]);

    return matches;
  }

  let isPageWide = useMediaQuery("(min-width: 768px)");

  const [state, setState] = useState("dashboard");

  //this useEffect check that which division was called before
  useEffect(() => {
    const data = localStorage.getItem("dashComponent");
    if (data) {
      setState(data);
    }
  }, []);

  // if the user opens the site for the first time it sets default value of login state to false in local storage
  useEffect(() => {
    localStorage.setItem("dashComponent", state);
  }, [state]);

  const [showModal, setShowModal] = useState(false);

  //${sty.sidebar}
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="bg-white relative">
      <svg
              viewBox="0 0 24 24" 
              className="fill-current text-white transform rotate-90 h-8 w-8 mr-2"
            >
              <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
            </svg>
        <div className={"flex flex-col md:flex-row border-r   border-divider"}>
          <div
            className={`${
              isPageWide
                ? `flex-auto bg-white border-blue-600 border-r-4  drop-shadow-lg	 w-40 top-0 z-10 fixed  h-screen flex flex-col justify-center items-center `
                : `hidden`
            }`}
          >
            <ul className={"px-1 w-full border-divider rounded-lg"}>
              <li
                className={
                  "py-2.5 flex cursor-pointer pl-2 rounded-lg  align-middle hover:bg-blue-100"
                }
              >
                <a
                  className="flex justify-center align-middle"
                  onClick={() => {
                    setState("dashboard");
                  }}
                >
                  {/* <img src="./dashboard.svg" className={"w-8 h-8"} alt="ok" /> */}
                  <div className="w-8 h-8">
                    <Image
                      src="/dashboard.svg"
                      alt="create"
                      height={27}
                      width={27}
                      blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAADAAQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAbEAADAAMBAQAAAAAAAAAAAAABAgMABAURUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAFxEAAwEAAAAAAAAAAAAAAAAAAAECEf/aAAwDAQACEQMRAD8Anz9voy1dCI2mectSE5ioFCqia+KCwJ8HzGMZPqJb1oPEf//Z"
                    />
                  </div>
                  <div className="align-middle">
                    <span className="text-[17px] font-medium text-black ">Dashboard</span>
                  </div>
                </a>
              </li> 
              <li
                className={
                  "py-2.5 pl-2 cursor-pointer flex rounded-lg align-middle hover:bg-blue-100"
                }
              >
                <a
                  className="flex justify-center align-middle"
                  onClick={() => {
                    setState("Create");
                  }}
                >
                  {/* <img src="./plus.svg" className={"w-8 h-8"} alt="ok" /> */}
                  <div className="w-8 h-8 my-auto align-middle ">
                    <Image
                      className="text-black"
                      src="/plus.svg"
                      alt="create"
                      height={27} 
                      width={27}
                      blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAADAAQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAbEAADAAMBAQAAAAAAAAAAAAABAgMABAURUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAFxEAAwEAAAAAAAAAAAAAAAAAAAECEf/aAAwDAQACEQMRAD8Anz9voy1dCI2mectSE5ioFCqia+KCwJ8HzGMZPqJb1oPEf//Z"
                    />
                    
                  </div>
                  <div className="align-middle">
                    <span className="text-[17px] font-medium text-black ">Create</span> 
                  </div>
                </a>
              </li>
             
              <li
                className={
                  "py-2.5 flex pl-2 cursor-pointer rounded-lg  align-middle hover:bg-blue-100"
                }
              >
                <a
                  className="flex justify-center align-middle"
                  onClick={() => {
                    setState("mysnippet");
                  }}
                >
                  {/* <img src="./arrow.svg" className={"w-8 h-8"} alt="ok" /> */}
                  <div className="w-8 h-8">
                    <Image
                      src="/arrow.svg"
                      alt="create"
                      height={27}
                      width={27}
                      blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAADAAQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAbEAADAAMBAQAAAAAAAAAAAAABAgMABAURUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAFxEAAwEAAAAAAAAAAAAAAAAAAAECEf/aAAwDAQACEQMRAD8Anz9voy1dCI2mectSE5ioFCqia+KCwJ8HzGMZPqJb1oPEf//Z"
                    />
                  </div>
                  <div className="align-middle">
                    <span className="text-[17px] font-medium text-black ">Snippets</span>
                  </div>
                </a>
              </li>
              <li
                className={
                  "py-2.5 flex pl-2 cursor-pointer rounded-lg  align-middle hover:bg-blue-100"
                }
              > 
              {/* 004BFF */}
                <a
                  className="flex justify-center align-middle"
                  onClick={() => {
                    setState("myfavorites");
                  }}
                >
                  {/* <img src="./favorite.svg" className={"w-8 h-8"} alt="ok" /> */}
                  <div className="w-8 h-8">
                    <Image
                      src="/favorite.svg"
                      alt="create"  
                      height={27}
                      width={27}
                      blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAADAAQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAbEAADAAMBAQAAAAAAAAAAAAABAgMABAURUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAFxEAAwEAAAAAAAAAAAAAAAAAAAECEf/aAAwDAQACEQMRAD8Anz9voy1dCI2mectSE5ioFCqia+KCwJ8HzGMZPqJb1oPEf//Z"
                    />
                  </div>
                  <div className="align-middle">
                    <span className="text-[17px] font-medium text-black ">Favourite</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>
           
          <div className={" flex-auto min-h-screen mt-10 w-full"}>
            {state == "Create" && <Create token={token} />}
            {state == "dashboard" && (
              <Mydashboard
                {...props}
                update={updateDashboard}
                details={details}
                setDetails={setDetails}
                edit={edit}
                setEdit={setEdit}
              />
            )}
            {state == "mysnippet" && <Mysnippet {...props} />}
            {state == "myfavorites" && (
              <Myfavorites {...favsnip} token={token} />
            )}
            
          </div>

          {/* mobile view */}
          <div
            className={`${
              isPageWide
                ? `hidden`
                : `bg-primary_bg  fixed bottom-0 left-0 right-0 flex justify-around py-2.5`
            }`}
          >
            <div
              className={"rounded-lg p-2 align-middle hover:bg-action_hover"}
            >
              <a
                onClick={() => {
                  setState("Create");
                }}
              >
                {/* <img src="./plus.svg" className={"w-8 h-8"} alt="ok" /> */}
                <div className="w-8 h-8">
                  <Image
                    src="/plus.svg"
                    alt="create"
                    height={30}
                    width={30}
                    blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAADAAQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAbEAADAAMBAQAAAAAAAAAAAAABAgMABAURUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAFxEAAwEAAAAAAAAAAAAAAAAAAAECEf/aAAwDAQACEQMRAD8Anz9voy1dCI2mectSE5ioFCqia+KCwJ8HzGMZPqJb1oPEf//Z"
                  />
                </div>
              </a>
            </div>
            <div
              className={"rounded-lg p-2 align-middle hover:bg-action_hover"}
            >
              <a
                onClick={() => {
                  setState("dashboard");
                }}
              >
                {/* <img src="./dashboard.svg" className={"w-8 h-8"} alt="ok" /> */}
                <div className="w-8 h-8">
                  <Image
                    src="/dashboard.svg"
                    alt="create"
                    height={30}
                    width={30}
                    blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAADAAQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAbEAADAAMBAQAAAAAAAAAAAAABAgMABAURUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAFxEAAwEAAAAAAAAAAAAAAAAAAAECEf/aAAwDAQACEQMRAD8Anz9voy1dCI2mectSE5ioFCqia+KCwJ8HzGMZPqJb1oPEf//Z"
                  />
                </div>
              </a>
            </div>
            <div
              className={"rounded-lg p-2 align-middle hover:bg-action_hover"}
            >
              <a
                onClick={() => {
                  setState("mysnippet");
                }}
              >
                {/* <img src="./arrow.svg" className={"w-8 h-8"} alt="ok" /> */}
                <div className="w-8 h-8">
                  <Image
                    src="/arrow.svg"
                    alt="create"
                    height={30}
                    width={30}
                    blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAADAAQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAbEAADAAMBAQAAAAAAAAAAAAABAgMABAURUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAFxEAAwEAAAAAAAAAAAAAAAAAAAECEf/aAAwDAQACEQMRAD8Anz9voy1dCI2mectSE5ioFCqia+KCwJ8HzGMZPqJb1oPEf//Z"
                  />
                </div>
              </a>
            </div>
            <div
              className={"rounded-lg p-2 align-middle hover:bg-action_hover"}
            >
              <a
                onClick={() => {
                  setState("myfavorites");
                }}
              >
                {/* <img src="./favorite.svg" className={"w-8 h-8"} alt="ok" /> */}
                <div className="w-8 h-8">
                  <Image
                    src="/favorite.svg"
                    alt="create"
                    height={30}
                    width={30}
                    blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAADAAQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAbEAADAAMBAQAAAAAAAAAAAAABAgMABAURUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAFxEAAwEAAAAAAAAAAAAAAAAAAAECEf/aAAwDAQACEQMRAD8Anz9voy1dCI2mectSE5ioFCqia+KCwJ8HzGMZPqJb1oPEf//Z"
                  />
                </div>
              </a>
            </div>
          </div>
        </div>
        <CustomAlert />
      </div>
    </>
  );
}

export const getServerSideProps = requireAuthentication(
  async (context, claims) => {
    // console.log(claims._id)
    const cid = claims._id;
    // console.log(context.req.cookies['token'])
    const token = context.req.cookies["token"];
    console.log(token, "token");

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
          return {
            props: { info, snip, favsnip, token },
          };
        }
      }
    } catch (err) {
      return {
        props: {},
      };
    }
  }
);
