import Main from "./Main";
import Login from "./Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";
import Completed from "./Completed";
const Body = () => {
  const AppRoute = createBrowserRouter([
    {
      path: "/",
      element: <Login></Login>,
    },
    {
      path: "/home",
      element: <Main></Main>,
    },
  ]);
  const currenttheme = useSelector((store) => store.theme);

  return (
    <div
      className={"bg-" + (currenttheme.theme === "light" ? " " : "dark ")}
      style={{ height: "100vh" }}
    >
      <RouterProvider router={AppRoute}></RouterProvider>
    </div>
  );
};

export default Body;
