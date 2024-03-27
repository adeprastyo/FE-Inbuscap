import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Homepage from "@/pages/App";
import Login from "@/pages/auth/login";

const router = createBrowserRouter([
  { path: "/", element: <Homepage /> },
  { path: "/login", element: <Login /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
