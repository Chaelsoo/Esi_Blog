import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./home.jsx";
import Profile from './profile.jsx';
import Article from './article.jsx';
import Pass from './pass.jsx';
import { AuthProvider } from "./AuthContext";
import Publish from './publish.jsx'


function AuthenticatedRoutes() {
  return (
    <AuthProvider>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route Component={Profile} path="profile/"/>
      <Route Component={Article} path='article/:id/'/>
      <Route Component={Pass} path='pass/'/>
      <Route Component={Publish} path='publish/'/>
    </Routes>
    </AuthProvider>
  );
}

export default AuthenticatedRoutes;
