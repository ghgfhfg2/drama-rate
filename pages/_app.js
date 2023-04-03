import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser } from "@redux/actions/user_action";
import "../styles/globals.css";
import "../styles/App.css";
import "../styles/scss-common.css";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import wrapper from "@redux/store/configureStore";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Layout from "@component/Layout";
import Loading from "@component/Loading";
import { setLogo } from "@redux/actions/logo_action";
import { HiddenText } from "@component/CommonStyled";

function App({ Component, pageProps }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const path = router.pathname;
  const [isLoading, setisLoading] = useState(true);

  const setVh = () => {
    document.documentElement.style.setProperty(
      "--vh",
      `${window.innerHeight * 0.01}px`
    );
  };

  useEffect(() => {
    const handleStart = (url) => {
      NProgress.start();
    };
    const handleStop = () => {
      NProgress.done();
    };
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);
    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  useEffect(() => {
    window.addEventListener("resize", setVh);
    return () => {
      window.removeEventListener("resize", setVh);
    };
  }, []);

  const getLayout =
    Component.getLayout ||
    ((page) => {
      return <Layout>{page}</Layout>;
    });

  return (
    <>
      <HiddenText>
        <h1>텍스트 특수문자 이모티콘</h1>
        <h2>특수문자 이모티콘 모음 - Text Emoticon collection</h2>
        <h3>이모티콘,특수기호,인싸티콘,특수문자,텍대,텍스트</h3>
      </HiddenText>
      <ChakraProvider>
        {/* {isLoading ? (
          <>
            <Flex minHeight="100vh" justifyContent="center" alignItems="center">
              <Loading size={`xl`} />
            </Flex>
          </>
        ) : (
          getLayout(<Component {...pageProps} />)
        )} */}
        {getLayout(<Component {...pageProps} />)}
      </ChakraProvider>
    </>
  );
}

export default wrapper.withRedux(App);
