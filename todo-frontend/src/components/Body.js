import Main from "./Main";
import Login from "./Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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

  return (
    <div>
      <RouterProvider router={AppRoute}></RouterProvider>
    </div>
  );
};

export default Body;
