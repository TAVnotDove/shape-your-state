import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
import { UserContextProvider } from "./contexts/userContext";
import { ThemeContextProvider } from "./contexts/themeContext";
import CreatePost from "./components/CreatePost/CreatePost";
import Posts from "./components/Posts/Posts";
import Post from "./components/Post/Post";
import EditPost from "./components/EditPost/EditPost";
import DeletePost from "./components/DeletePost/DeletePost";
import UserRouteGuard from "./components/UserRouteGuard/UserRouteGuard";
import EditComment from "./components/EditComment/EditComment";
import DeleteComment from "./components/DeleteComment/DeleteComment";
import RouteNotFound from "./components/RouteNotFound/RouteNotFound";
import GuestRouteGuard from "./components/GuestRouteGuard/GuestRouteGuard";
import ProfileSettings from "./components/ProfileSettings/ProfileSettings";

function App() {
  return (
    <>
      <UserContextProvider>
        <ThemeContextProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<UserRouteGuard />}>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Route>
            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/:postId" element={<Post />} />
            <Route element={<GuestRouteGuard />}>
              <Route path="/logout" element={<Logout />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/settings" element={<ProfileSettings />} />
              <Route path="/post/create" element={<CreatePost />} />
              <Route path="/post/edit/:postId" element={<EditPost />} />
              <Route path="/post/delete/:postId" element={<DeletePost />} />
              <Route
                path="/comment/edit/:commentId"
                element={<EditComment />}
              />
              <Route
                path="/comment/delete/:commentId"
                element={<DeleteComment />}
              />
            </Route>
            <Route path="/*" element={<RouteNotFound />} />
          </Routes>
          <Footer />
        </ThemeContextProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
