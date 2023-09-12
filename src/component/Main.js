import { useEffect, useState } from "react";
import {
  Button,
  Flex,
  Input,
  Radio,
  RadioGroup,
  Select,
  Spinner,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import GoogleAd from "./GoogleAd";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { selectDate } from "./SelectDb";
import { useRouter } from "next/router";
import styled from "styled-components";
const MainComponent = styled.div`
  .main_info {
    padding: 1rem;
    line-height: 1.7;
    h2 {
      color: #4a63e9;
      font-size: 20px;
      margin-top: 20px;
    }
    span {
      font-weight: 600;
      font-size: 1.5rem;
      flex-shrink: 0;
    }
  }
  .form {
    border: 1px solid #ddd;
    border-radius: 10px;
    margin: 30px 0 50px 0;
    padding: 3rem;
    font-size: 17px;
    select {
      height: 42px;
      font-size: 17px;
      padding: 0 2rem;
    }
    .btn_calc {
      width: 100%;
      height: 50px;
    }
  }
`;

export default function Main() {
  const router = useRouter();
  const toast = useToast();
  const [sexState, setSexState] = useState();
  const {
    handleSubmit,
    register,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [selectDb, setSelectDb] = useState();
  useEffect(() => {
    setSelectDb(selectDate());
  }, []);

  const onSubmit = (values) => {
    let date = `${values.year}${values.month}${values.day}`;
    const sumCalc = (num) => {
      let arr = String(num).split("");
      let tempSum = 0;
      for (let i = 0; i < arr.length; i++) {
        tempSum += 1 * arr[i];
      }
      return tempSum;
    };
    while (date >= 10) {
      date = sumCalc(date);
    }
    router.push(`/result?id=${date}`);
  };

  return (
    <>
      <Head>
        <title>탄생수 계산기 - 탄생수로 알아보는 나의 유형</title>
      </Head>
      <MainComponent>
        <div className="content_box">
          <GoogleAd />
          {isLoading && (
            <Spinner
              style={{
                position: "fixed",
                left: "50%",
                top: "50%",
                transform: "translate(-50%,-50%)",
              }}
            />
          )}
          {!isLoading && selectDb && (
            <>
              <div className="main_info">
                <h2>탄생수란?</h2>
                <p>
                  탄생수는 여러분의 생년월일을 기반으로 계산되는 숫자로서,
                  개개인의 성격, 경향성, 미래의 가능성을 예측하는 데 사용되는
                  것을 말해요.
                </p>
                <h2>탄생수 계산법</h2>
                <p>
                  1. 먼저, 태어난 연도의 각 숫자를 모두 더합니다. 예를 들어,
                  1995년에 태어났다면 1 + 9 + 9 + 5 = 24가 됩니다.
                  <br />
                  2. 이렇게 얻어진 숫자를 다시 각 자리의 숫자들을 더해 한 자리
                  숫자로 만듭니다. 위의 예에서 24를 다시 계산하면 2 + 4 = 6이
                  됩니다.
                  <br />
                  3. 이제 이 한 자리 숫자가 여러분의 탄생수입니다!
                </p>
              </div>
              <form
                className="form"
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
                onSubmit={handleSubmit(onSubmit)}
              >
                <Flex mb={4} justifyContent="center">
                  <Flex align="center" mr={5}>
                    <Select size="lg" defaultValue={1990} {...register("year")}>
                      {selectDb.yearArr.map((el) => (
                        <>
                          <option value={el}>{el}</option>
                        </>
                      ))}
                    </Select>
                    <Text ml={2}>년</Text>
                  </Flex>
                  <Flex align="center" mr={5}>
                    <Select size="lg" defaultValue={1} {...register("month")}>
                      {selectDb.monthArr.map((el) => (
                        <>
                          <option value={el}>{el}</option>
                        </>
                      ))}
                    </Select>
                    <Text ml={2}>월</Text>
                  </Flex>
                  <Flex align="center">
                    <Select size="lg" defaultValue={1} {...register("day")}>
                      {selectDb.dayArr.map((el) => (
                        <>
                          <option value={el}>{el}</option>
                        </>
                      ))}
                    </Select>
                    <Text ml={2}>일</Text>
                  </Flex>
                </Flex>
                <Flex justifyContent="center">
                  <Button
                    colorScheme="blue"
                    className="btn_calc"
                    size="lg"
                    type="submit"
                  >
                    해당 날짜의 탄생수 알아보기
                  </Button>
                </Flex>
              </form>
            </>
          )}
        </div>
      </MainComponent>
    </>
  );
}
