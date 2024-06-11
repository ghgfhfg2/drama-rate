import { useEffect, useState } from "react";
import {
  Button,
  Skeleton,
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
import axios from "axios";
import { CommonPopup } from "./CommonPop";
import LineChartComponent from "./LineChartComponent";
import { previousMonday, nextSunday, format, subDays, addDays } from "date-fns";
import { FiChevronLeft } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";
import Loading from "./Loading";

const RateRank = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 30px;
  li {
    &:nth-child(1),
    &:nth-child(2),
    &:nth-child(3),
    &:nth-child(4),
    &:nth-child(5) {
      font-size: 18px;
      font-weight: bold;
    }
    &:nth-child(1) {
      background: #111;
      color: #fff;
    }
    display: flex;
    gap: 10px;
    border-radius: 8px;
    padding: 10px 15px;
    transition: all 0.2s;
    cursor: pointer;
    &:hover {
      box-shadow: 0 0 13px rgba(0, 0, 0, 0.2);
      padding: 10px 20px;
      transform: scale(1.03, 1.1);
    }
    .rate {
      margin-left: auto;
    }
  }
`;
const RatePop = styled(CommonPopup)`
  .con_box {
    .btn_close {
      position: absolute;
      right: 15px;
      top: 15px;
    }
    h3 {
      font-size: 22px;
      text-align: center;
    }
    .casting {
      margin-top: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      dt {
        font-weight: 600;
      }
      dd {
        display: flex;
        flex-wrap: wrap;
        span {
          margin: 0 3px;
        }
      }
    }
    width: 90%;
    max-width: 700px;
    height: auto;
  }
  @media all and (max-width: 400px) {
    .con_box {
      h3 {
        font-size: 18px;
      }
    }
  }
`;

const MainComponent = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 1rem;
  padding-bottom: 100px;
  .main_info_box {
    h2 {
      font-size: 16px;
      margin-bottom: 10px;
    }
    padding: 15px;
    background: #f1f1f1;
    border-radius: 6px;
    margin-bottom: 20px;
  }
  .date_wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    .date_box {
      font-size: 16px;
    }
  }
`;

export default function Main() {
  const apiUrl = "https://port-0-sy-cheerio-2rrqq2blmlvy0fh.sel5.cloudtype.app";
  const router = useRouter();
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const [listData, setlistData] = useState();

  const [curDate, setCurDate] = useState(new Date());
  const [dateRange, setDateRange] = useState();

  const prevWeek = (e) => {
    setCurDate(subDays(curDate, 7));
  };
  const nextWeek = () => {
    if (format(curDate, "yyyyMMdd") == format(new Date(), "yyyyMMdd")) {
      toast({
        description: "가장 최신 데이터 입니다.",
        status: "info",
        duration: 1000,
        isClosable: true,
      });
      return;
    } else {
      setCurDate(addDays(curDate, 7));
    }
  };

  useEffect(() => {
    if (!curDate) return;
    let monday = previousMonday(previousMonday(curDate));
    let sunday = nextSunday(monday);
    const month = monday.getMonth() + 1;
    const date = monday.getDate();
    setDateRange({
      start: format(monday, "yyyy.MM.dd"),
      end: format(sunday, "yyyy.MM.dd"),
    });
    const getRank = async () => {
      setIsLoading(true);
      await axios
        .get(`${apiUrl}/getRank?month=${month}&date=${date}`)
        .then((res) => {
          let data = JSON.parse(res.data.list);
          data = data.sort((a, b) => {
            return (
              b.rate.substr(0, b.rate.length - 1) -
              a.rate.substr(0, a.rate.length - 1)
            );
          });
          data = data.map((el, idx) => {
            el.rank = idx + 1;
            return el;
          });
          setlistData(data);
        });
      setIsLoading(false);
    };
    getRank();
  }, [curDate]);

  const [allTargetData, setAllTargetData] = useState({});
  const [targetData, setTargetData] = useState();
  const getRateAll = (el) => {
    if (allTargetData[`data_${el.rank}`]) {
      setTargetData(allTargetData[`data_${el.rank}`]);
      onPop();
    } else {
      onPop();
      axios.get(`${apiUrl}/getRateAll?title=${el.title}`).then((res) => {
        if (!res.data) {
          toast({
            description: "시청률 추이가 없는 드라마 입니다.",
            status: "info",
            position: "top",
            duration: 1500,
            isClosable: true,
          });
          closePop();
          return;
        }
        let list = JSON.parse(res.data.list);
        list = list.map((el) => {
          if (el.num) {
            const num = el.num.split("회");
            el.num = num[0] + "회";
          }
          return el;
        });
        list.reverse();
        const data = {
          info: {
            ...el,
            casting: res.data.casting.slice(0, 5),
          },
          list,
        };
        setAllTargetData((prev) => {
          prev[`data_${el.rank}`] = data;
          return prev;
        });
        console.log(data);
        setTargetData(data);
      });
    }
  };

  const [isPop, setIsPop] = useState(false);
  const onPop = () => {
    setIsPop(true);
  };
  const closePop = () => {
    setTargetData("");
    setIsPop(false);
  };

  return (
    <>
      <MainComponent>
        <div className="content_box">
          <GoogleAd />
          <div className="main_info_box">
            <h2 className="p-font">K-드라마 시청률 안내</h2>
            <p>
              - 방송사별 드라마의 시청률을 통합하여 한눈에 시청률을 비교해 볼 수
              있습니다.
              <br />- 드라마를 선택하면 주요 출연진과 시청률 추이를 볼 수
              있습니다.
              <br />- 시청률 추이의 경우 최근 50회차 까지만 제공합니다.
              <br />- 주간 시청률이므로 모든 드마라가 최신화 시청률은 아닐 수
              있습니다.(드라마 선택해서 보이는 시청률 추이에서 최신화 시청률
              확인이 가능합니다.)
            </p>
          </div>
          {dateRange && (
            <div className="date_wrap">
              <Button onClick={prevWeek} disabled={isLoading}>
                <FiChevronLeft />
              </Button>
              <div className="date_box">
                <span className="start">{dateRange.start}</span>
                <span style={{ margin: "0 4px" }}>~</span>
                <span className="end">{dateRange.end}</span>
              </div>
              <Button onClick={nextWeek} disabled={isLoading}>
                <FiChevronRight />
              </Button>
            </div>
          )}

          {isLoading ? (
            <Stack mb={20}>
              <Skeleton height="50px" />
              <Skeleton height="50px" />
              <Skeleton height="50px" />
              <Skeleton height="50px" />
              <Skeleton height="50px" />
              <Skeleton height="50px" />
              <Skeleton height="50px" />
              <Skeleton height="50px" />
              <Skeleton height="50px" />
              <Skeleton height="50px" />
              <Skeleton height="50px" />
              <Skeleton height="50px" />
              <Skeleton height="50px" />
              <Skeleton height="50px" />
              <Skeleton height="50px" />
              <Skeleton height="50px" />
            </Stack>
          ) : (
            <>
              {listData && (
                <>
                  <RateRank>
                    {listData.map((el) => (
                      <li
                        key={el.rank}
                        onClick={() => {
                          getRateAll(el);
                        }}
                      >
                        <span>{el.rank}</span>
                        <span>{el.title}</span>
                        <span>{el.ch}</span>
                        <span className="rate">{el.rate}</span>
                      </li>
                    ))}
                  </RateRank>
                </>
              )}
            </>
          )}

          <div className="main_info_box">
            <h2 className="p-font">K-드라마 시청률 제작동기</h2>
            <div>
              세상에 드라마는 많고 시간은 부족하다보니 개인적으로 드라마를
              고르는 기준이 생겼습니다.
              <div style={{ margin: "5px 0", fontWeight: "600" }}>
                첫쨰, 현재 방영중인 드라마들 중 상위권의 시청률 이어야 한다.
                <br />
                둘째, 시청률 추이가 우상향 중이어야 한다.
              </div>
              저와 비슷한 기준점으로 드라마를 고르는 분들에게 도움이 될 수
              있을것 같아 사이트를 개발하게 되었습니다.
            </div>
          </div>
        </div>
      </MainComponent>
      {isPop && (
        <RatePop closePop={closePop}>
          <div className="con_box">
            <Button onClick={closePop} className="btn_close">
              X
            </Button>
            {targetData ? (
              <>
                <h3 className="p-font">
                  {targetData.info.title} - {targetData.info.ch}
                </h3>
                {targetData.info?.casting && (
                  <>
                    <dl className="casting">
                      <dt>주요 출연진</dt>
                      <dd>
                        {targetData.info.casting.map((el) => (
                          <>
                            <span>{el}</span>
                          </>
                        ))}
                      </dd>
                    </dl>
                  </>
                )}
                {targetData.list && (
                  <LineChartComponent data={targetData.list} />
                )}
              </>
            ) : (
              <Flex
                justifyContent="center"
                alignItems="center"
                style={{ width: "100%", height: "300px" }}
              >
                <Loading />
              </Flex>
            )}
          </div>
          <div className="bg" onClick={closePop}></div>
        </RatePop>
      )}
    </>
  );
}
