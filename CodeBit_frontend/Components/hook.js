import Link from "next/link";
import { useContext } from "react";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/client";
import axios from "axios";
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { AuthContext } from "../utils/contexts";
import router from "next/router";
import cookie from 'js-cookie'

export default function Hook(props) {

  const {loginState, setLoginState} = useContext(AuthContext);
  const logout = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/logout`, { withCredentials: true })
      if (res) {
        // console.log(res.data)
        cookie.remove("token");
        setLoginState('false')
        router.push('/')
      }
    } catch (error) {
      console.log(error)
    }
  }
  const [session, loading] = useSession();
  if (session || (loginState == 'true')) {
    return (
      <>
        <Link href="/dashboard" passHref>
        <button className="bg-ghost text-slate-900 font-Ubuntu hover:bg-slate-300  border border-ghost lg:mr-4 font-bold py-0.5 px-2 rounded-md">
          Dashboard
          {/* <DashboardIcon  /> */}
        </button>
        </Link>
        <button onClick={logout} className="hover:bg- font-Ubuntu border-none lg:mr-4 font-bold py-1 px-2 rounded-md">
          <LogoutIcon color="error" className="hover:text-red-500" />
        </button>
      </>
    );
  }
  return (
    <>
      <Link href="/Auth" passHref>
        <button className="bg-blue-200  text-slate-900 font-Ubuntu hover:bg-indigo-500 hover:text-white drop-shadow-lg border border-ghost lg:mr-4 font-bold py-0.5 px-2 rounded-md">
            Get Started 
        </button>
      </Link>
    </>
  );
}
