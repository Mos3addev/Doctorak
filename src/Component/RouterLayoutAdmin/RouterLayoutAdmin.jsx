import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../Component/Sidebar/Sidebar";

export default function RouterLayoutAdmin({logOut}) {
  return (
    <>
      <Sidebar logOut={logOut}></Sidebar>
      <Outlet></Outlet>
    </>
  );
}
