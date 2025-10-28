import Main from "@component/Main";
import MainLayout from "@component/MainLayout";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/main");
  }, []);
  return (
    <>
      <Main />
    </>
  );
};

export default Home;

Home.getLayout = function getLayout(page, logoImg) {
  return <MainLayout logoImg={logoImg}>{page}</MainLayout>;
};
