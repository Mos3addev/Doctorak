import React from "react";
import { Outlet } from "react-router-dom";

export default function RouterLayoutDoctor() {
  return (
    <>
      <Outlet></Outlet>
      {/* <Footer/> */}
    </>
  );
}
