import { Flex } from "@chakra-ui/react";
import React from "react";
import Header from "./Header";
import Loading from "./Loading";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <>
      <div className="wrapper">
        <Header />
        <div className="container">
          <div className="content_box">
            {children ? (
              <main>{children}</main>
            ) : (
              <Flex justifyContent="center" alignItems="center">
                <Loading />
              </Flex>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Layout;
