import React from "react";
import { Outlet } from "react-router-dom";
import TasksHeader from "./tasks-header";

export default function TasksLayout() {
  return (
    <div>
      <TasksHeader />
      <div className="max-w-5xl mx-auto p-4">
        <Outlet />
      </div>
    </div>
  );
}
