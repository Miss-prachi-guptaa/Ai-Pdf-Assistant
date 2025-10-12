import { HandleSpeak } from "./component/Handlespeak";
import { AppLayout } from "./component/Layout/Applayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Hero } from "./component/UI/Hero";
import { Chat } from "./component/UI/Chat";
import { Feature } from "./component/UI/Feature";
import { About } from "./component/UI/About";
import { Register } from "./component/Auth/Register";
import { Login } from "./component/Auth/Login";


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Hero />
        },
        {
          path: "/chat",
          element: <HandleSpeak />
        },
        {
          path: "/features",
          element: <Feature />
        },
        {
          path: "/about",
          element: <About />
        },
        {
          path: "/register",
          element: <Register />
        },
        {
          path: "login",
          element: <Login />
        }
      ]
    }
  ]);


  return <RouterProvider router={router} />;
}

export default App;
