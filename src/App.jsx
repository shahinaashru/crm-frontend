import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import Home from "./pages/Home";
import User from "./pages/User";
import AddUser from "./pages/AddUser";
import Customer from "./pages/Customer";
import AddCustomer from "./pages/AddCustomer";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EditCustomer from "./pages/editCustomer";
import EditUser from "./pages/EditUser";
import Case from "./pages/Case";
import AddCase from "./pages/AddCase";
import ViewProfile from "./pages/ViewProfile";
import PrivateRoute from "./components/PrivateRoute";
function App() {
  const router = createBrowserRouter(
    [
      {
        path: "/", // Login route
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/crm",
        element: <PrivateRoute />,
        children: [
          {
            element: <AdminLayout />,
            children: [
              {
                path: "dashboard",
                element: <Home />,
              },
              {
                path: "view-profile",
                element: <ViewProfile />,
              },
              {
                path: "user",
                element: <User />,
              },
              {
                path: "add-user",
                element: <AddUser />,
              },
              {
                path: "edit-user/:userId/:userName",
                element: <EditUser />,
              },
              {
                path: "customer",
                element: <Customer />,
              },
              {
                path: "add-customer",
                element: <AddCustomer />,
              },
              {
                path: "edit-customer/:customerId",
                element: <EditCustomer />,
              },
              {
                path: "case",
                element: <Case />,
              },
              {
                path: "add-case",
                element: <AddCase />,
              },
            ],
          },
        ],
      },
      {
        path: "*",
        element: <div>404 - Page Not Found</div>, // catch-all route
      },
    ],
    {
      basename: "/crm-frontend", // <- Important for subfolder deployment
    }
  );
  return <RouterProvider router={router} />;
}

export default App;
