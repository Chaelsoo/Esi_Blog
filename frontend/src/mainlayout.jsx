import React from "react";
import { AuthProvider } from "./AuthContext";
import YourAppRootComponent from "./YourAppRootComponent";

function MainLayout() {
  return (
    <AuthProvider>
      <YourAppRootComponent />
    </AuthProvider>
  );
}

export default MainLayout;