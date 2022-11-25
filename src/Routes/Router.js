import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import Main from "../layout/Main";
import AddProduct from "../Pages/DashBoard/AddProduct/AddProduct";
import DashBoard from "../Pages/DashBoard/DashBoard/DashBoard";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Products from "../Pages/Products/Products";
import Register from "../Pages/Register/Register";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
    {
        path: '/', element: <Main></Main>, children: [
            {
                path: '/', element: <Home></Home>
            },
            {
                path: '/home', element: <Home></Home>
            },
            {
                path: '/login', element: <Login></Login>
            },
            {
                path: '/register', element: <Register></Register>
            },
            {
                path: '/category/:id', element: <Products></Products>
            },
        ]
    },
    {
        path: '/dashboard', element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>, children: [
            {
                path: '/dashboard', element: <PrivateRoute><DashBoard></DashBoard></PrivateRoute>
            },
            {
                path: '/dashboard/addProduct', element: <PrivateRoute><AddProduct></AddProduct></PrivateRoute>
            },
        ]
    }
])

export default router;