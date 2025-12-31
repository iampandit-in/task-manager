import React from "react";
import { Outlet } from "react-router-dom";

export default function CommonLayout() {
  return (
    <div className="max-w-5xl mx-auto p-4">
      <Outlet />
    </div>
  );
}
