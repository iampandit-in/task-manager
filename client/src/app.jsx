import { Route, Routes } from "react-router-dom";

import CommonLayout from "./components/common-layout";
import Tasks from "./components/pages/tasks";
import ScrumBoard from "./components/pages/scrum-board";
import TasksLayout from "./components/tasks-layout";
import Signin from "./components/auth/signin";
import SignUp from "./components/auth/signup";

export default function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/" element={<CommonLayout />}>
        <Route index element={<Tasks />} />
      </Route>
      <Route path="/tasks" element={<TasksLayout />}>
        <Route index element={<Tasks />} />
        <Route path="list" element={<Tasks />} />
        <Route path="scrum-board" element={<ScrumBoard />} />
      </Route>
    </Routes>
  );
}
