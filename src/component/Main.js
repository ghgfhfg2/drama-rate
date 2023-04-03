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

export default function Main() {
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
    const prompt = `${values.year}년 ${values.month}월 ${values.day}일`;
    console.log(prompt);
  };

  return (
    <>
      <Head>
        <title>시로 알아보는 사주풀이</title>
      </Head>
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
            <form
              style={{
                width: "100%",
                minHeight: "40vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
              onSubmit={handleSubmit(onSubmit)}
            >
              <Flex align="center" justifyContent="center" mb={4}>
                <RadioGroup size="lg" onChange={setSexState} value={sexState}>
                  <Stack spacing={5} direction="row">
                    <Radio value="남자">남자</Radio>
                    <Radio value="여자">여자</Radio>
                  </Stack>
                </RadioGroup>
              </Flex>
              <Flex mb={2} justifyContent="center">
                <Flex align="center" mr={2}>
                  <Input {...register("name")} placeHolder="이름" />
                </Flex>
                <Flex align="center">
                  <Input {...register("city")} placeHolder="태어난 도시" />
                </Flex>
              </Flex>
              <Flex mb={4} justifyContent="center">
                <Flex align="center" mr={2}>
                  <Select defaultValue={1990} {...register("year")}>
                    {selectDb.yearArr.map((el) => (
                      <>
                        <option value={el}>{el}</option>
                      </>
                    ))}
                  </Select>
                  <Text ml={2}>년</Text>
                </Flex>
                <Flex align="center" mr={2}>
                  <Select defaultValue={1} {...register("month")}>
                    {selectDb.monthArr.map((el) => (
                      <>
                        <option value={el}>{el}</option>
                      </>
                    ))}
                  </Select>
                  <Text ml={2}>월</Text>
                </Flex>
                <Flex align="center">
                  <Select defaultValue={1} {...register("day")}>
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
                <Button size="lg" type="submit">
                  확인
                </Button>
              </Flex>
            </form>
          </>
        )}
      </div>
    </>
  );
}
