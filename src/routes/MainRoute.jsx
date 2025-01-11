import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddBlog from "../pages/AddBlog";
import AllBlogs from "../pages/AllBlogs";
import FeaturedBlogs from "../pages/FeaturedBlogs";
import Wishlist from "../pages/Wishlist";
import PrivateRoute from "../routes/PrivateRoute";
import BlogDetails from "../pages/BlogDetails";
import UpdateBlog from "../components/UpdateBlog";
import ScrollLinked from "../components/ScrollLinked";


const MainRoute = createBrowserRouter([
  {
    path: "/",
    element: <ScrollLinked></ScrollLinked>,
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
        path: "/blog/:id",
        element:  <BlogDetails></BlogDetails>
      },
      {
        path: "/update-blog/:id",
        element: <PrivateRoute>
          <UpdateBlog></UpdateBlog>
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
    path: "*",
    element: <NotFound></NotFound>
  }
]);

export default MainRoute;