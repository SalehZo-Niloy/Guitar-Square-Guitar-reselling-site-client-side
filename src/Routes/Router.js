import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import Main from "../layout/Main";
import Blogs from "../Pages/Blogs/Blogs";
import AddProduct from "../Pages/DashBoard/AddProduct/AddProduct";
import Buyers from "../Pages/DashBoard/Buyers/Buyers";
import DashBoard from "../Pages/DashBoard/DashBoard/DashBoard";
import MyOrders from "../Pages/DashBoard/MyOrders/MyOrders";
import MyProducts from "../Pages/DashBoard/MyProducts/MyProducts";
import ReportedProducts from "../Pages/DashBoard/ReportedProducts/ReportedProducts";
import Sellers from "../Pages/DashBoard/Sellers/Sellers";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Page404 from "../Pages/Page404/Page404";
import Payment from "../Pages/Payment/Payment";
import Products from "../Pages/Products/Products";
import Register from "../Pages/Register/Register";
import AdminRoute from "./AdminRoute/AdminRoute";
import BuyerRoute from "./BuyerRoute/BuyerRoute";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import SellerRoute from "./SellerRoute/SellerRoute";

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
                path: '/blogs', element: <Blogs></Blogs>
            },
            {
                path: '/category/:id', element: <PrivateRoute><Products></Products></PrivateRoute>
            },
        ]
    },
    {
        path: '/dashboard', element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>, children: [
            {
                path: '/dashboard', element: <PrivateRoute><DashBoard></DashBoard></PrivateRoute>
            },
            {
                path: '/dashboard/addProduct', element: <SellerRoute><AddProduct></AddProduct></SellerRoute>
            },
            {
                path: '/dashboard/myProducts', element: <SellerRoute><MyProducts></MyProducts></SellerRoute>
            },
            {
                path: '/dashboard/myOrders', element: <BuyerRoute><MyOrders></MyOrders></BuyerRoute>
            },
            {
                path: '/dashboard/payment/:id', element: <BuyerRoute><Payment></Payment></BuyerRoute>,
                loader: ({ params }) => fetch(`https://assignment-12-server-two.vercel.app/product/${params.id}`)
            },
            {
                path: '/dashboard/sellers', element: <AdminRoute><Sellers></Sellers></AdminRoute>
            },
            {
                path: '/dashboard/buyers', element: <AdminRoute><Buyers></Buyers></AdminRoute>
            },
            {
                path: '/dashboard/report', element: <AdminRoute><ReportedProducts></ReportedProducts></AdminRoute>
            },
        ]
    },
    {
        path: '*', element: <Page404></Page404>
    }
])

export default router;