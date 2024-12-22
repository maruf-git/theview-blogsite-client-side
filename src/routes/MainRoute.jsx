import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddBlog from "../pages/AddBlog";
import AllBlogs from "../pages/AllBlogs";
import FeaturedBlogs from "../pages/FeaturedBlogs";
import Wishlist from "../pages/Wishlist";
import PrivateRoute from "../routes/PrivateRoute";


const MainRoute = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/add-blog",
        element: <PrivateRoute>
          <AddBlog></AddBlog>
        </PrivateRoute>
      },
      {
        path: "/all-blogs",
        element: <AllBlogs></AllBlogs>
      },
      {
        path: "/featured-blogs",
        element: <FeaturedBlogs></FeaturedBlogs>
      },
      {
        path: "/wishlist",
        element: <PrivateRoute>
          <Wishlist></Wishlist>
        </PrivateRoute>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/Register",
        element: <Register></Register>
      },
    ]
  },
  {
    path: "/",
    element: <ErrorPage></ErrorPage>
  }
]);

export default MainRoute;