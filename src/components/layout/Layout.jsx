import React from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";
const Layout = ({ children }) => {
  return (
    <div style={{ zIndex: 100 }}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
