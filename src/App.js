import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Layout from './layout/Layout';

import Login from './pages/Login';
import Album from './pages/Album';
import Users from './pages/Users';
import CreateNewUser from './pages/CreateNewUser';



function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Album />
        },
        {
          path: "login",
          element: <Login />
        },
        {
          path: "users",
          element: <Users />
        }
        ,
        {
          path: "newuser",
          element: <CreateNewUser />
        }
      ]
    }


  ])
  return (<RouterProvider router={router} />);
}

export default App;
