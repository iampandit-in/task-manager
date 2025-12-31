import { Route, Routes } from "react-router-dom";
import Auth from "./components/pages/auth";
import CommonLayout from "./components/common-layout";
import Tasks from "./components/pages/tasks";
import ScrumBoard from "./components/pages/scrum-board";
import { ThemeProvider } from "./components/theme-provider";
import Header from "./components/header";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header />
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/tasks" element={<CommonLayout />}>
          <Route index element={<Tasks />} />
          <Route path="list" element={<Tasks />} />
          <Route path="scrum-board" element={<ScrumBoard />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
