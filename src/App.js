import "./App.css";
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
import CreatePost from "./components/CreatePost/CreatePost";
import Posts from "./components/Posts/Posts";
import Post from "./components/Post/Post";
import EditPost from "./components/EditPost/EditPost";
import DeletePost from "./components/DeletePost/DeletePost";
import RouteGuard from "./components/RouteGuard/RouteGuard";

function App() {
  return (
    <>
      <UserContextProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:postId" element={<Post />} />
          <Route element={<RouteGuard />}>
            <Route path="/logout" element={<Logout />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/post/create" element={<CreatePost />} />
            <Route path="/post/edit/:postId" element={<EditPost />} />
            <Route path="/post/delete/:postId" element={<DeletePost />} />
          </Route>
          <Route path="*" element={<p>404 No Page Found</p>} />
        </Routes>
        <Footer />
      </UserContextProvider>
    </>
  );
}

export default App;
